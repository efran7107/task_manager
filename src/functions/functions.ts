import { GetRequests } from "@/api/api";
import {
  AllData,
  Tag,
  TagInputButton,
  Task,
  TaskAssinmentLink,
  TaskTagLink,
  Team,
  TeamMember,
  TeamMemberTeamsLink,
  TUserTeams,
} from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getAllData = async (): Promise<AllData> => {
  const allData = {
    teams: await GetRequests.getAllTeams(),
    users: await GetRequests.getAllUsers(),
    userTeamLinks: await GetRequests.getAllTeamMemeberLinks(),
    tasks: await GetRequests.getAllTasks(),
    taskAssignments: await GetRequests.getAllTaskAssignmentLinks(),
    tags: await GetRequests.getAllTags(),
    taskTags: await GetRequests.getAllTaskTagLinks(),
    notes: await GetRequests.getAllNotes(),
  };
  return allData;
};

const getTeamMembers = (
  teams: Team[],
  users: TeamMember[],
  userTeamLinks: TeamMemberTeamsLink[],
  userId: number
): TUserTeams => {
  const userLinkIds = userTeamLinks
    .filter((link) => link.teamMemberId === userId)
    .map((link) => link.teamId);
  const userTeams: Team[] = [];
  for (const id of userLinkIds) {
    userTeams.push(...teams.filter((team) => team.id === id));
  }
  const teamUsersLinks = [];
  for (const team of userTeams) {
    teamUsersLinks.push(
      userTeamLinks.filter((link) => link.teamId === team.id)
    );
  }

  const teamUsers: TUserTeams = [];
  for (const userSet of teamUsersLinks) {
    const team: { team: Team; users: TeamMember[] } = {
      team: userTeams[teamUsersLinks.indexOf(userSet)],
      users: [],
    };
    for (const link of userSet) {
      team.users.push(...users.filter((user) => user.id === link.teamMemberId));
    }
    teamUsers.push(team);
  }

  return teamUsers;
};

const getUserTasks = (
  tasks: Task[],
  taskAssignments: TaskAssinmentLink[],
  userId: number
): Task[] => {
  const userTaskLinks = taskAssignments.filter(
    (link) => link.teamMemberId === userId
  );
  const userTasks: Task[] = [];
  for (const link of userTaskLinks) {
    userTasks.push(...tasks.filter((task) => task.id === link.taskId));
  }
  return userTasks;
};

const sortTasks = (tasks: Task[]) => {
  return tasks.sort((taskA, taskB) => {
    if (taskA.status === "to-do" && taskB.status !== "to-do") {
      return -1;
    } else if (taskA.status === "doing" && taskB.status === "done") {
      return -1;
    } else if (taskA.status === "done" && taskB.status !== "done") {
      return 1;
    } else if (taskA.status === taskB.status) {
      return 0;
    } else {
      return 1;
    }
  });
};

const getTodaysDate = (): string => {
  const today = new Date();
  return `${today.getMonth() + 1}/${today.getDate()}/${Number(
    today.getFullYear().toString().slice(2)
  )}`;
};

const getTaskTags = (
  tags: Tag[],
  tagAssignment: TaskTagLink[],
  taskId: number
): Tag[] => {
  const taskTagAssignment = tagAssignment.filter(
    (tagLink) => tagLink.taskId === taskId
  );
  const taskTags: Tag[] = [];

  for (const tagLink of taskTagAssignment) {
    taskTags.push(...tags.filter((tag) => tag.id === tagLink.tagId));
  }

  return taskTags;
};

const disableButton = (taskTag: Tag[], tagInput: string): TagInputButton => {
  const tags = taskTag.map((tag) => {
    return {
      ...tag,
      tagName: tag.tagName.slice(1),
    };
  });
  const availTag = tags.find(
    (tag) => tag.tagName.toLowerCase() === tagInput.toLowerCase()
  );
  if (availTag !== undefined) {
    return "delete";
  } else if (tagInput === "") {
    return "not-enough";
  } else {
    return "add";
  }
};

const getMaxDaysForMonth = (month: number, year: number): number => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (year % 4 === 0) {
        return 29;
      }
      return 28;
    default:
      return 1;
  }
};

const doesTagExist = (tag: string, tags: Tag[]): boolean => {
  return (
    tags.find((existingTag) => existingTag.tagName.slice(1) === tag) !==
    undefined
  );
};

const isOnlyOneLink = (
  tagName: string,
  tags: Tag[],
  tagLinks: TaskTagLink[]
) => {
  const tag = tags.find((availTags) => availTags.tagName.slice(1) === tagName);
  return tagLinks.filter((link) => link.tagId === tag!.id).length <= 1;
};

export const functions = {
  getHeaderContainer,
  getAllData,
  getTeamMembers,
  getUserTasks,
  sortTasks,
  getTodaysDate,
  getTaskTags,
  disableButton,
  getMaxDaysForMonth,
  doesTagExist,
  isOnlyOneLink,
};
