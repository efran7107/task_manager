import toast from "react-hot-toast";
import {
  AllData,
  Note,
  Page,
  Tag,
  Task,
  Team,
  TeamMemberLink,
  TeamProfile,
  User,
  UserTask,
} from "../types/objectTypes";
import { apiFunctions } from "./apiFunctions";

const logInUser = (
  setUser: (user: User) => void,
  username?: string,
  allUsers?: User[],
  user?: User
) => {
  if (user !== undefined) {
    setUser(user);
    return;
  }
  const validUser = allUsers?.find((user) => user.username === username);
  setUser(validUser!);
};

const createUser = (newUserInfo: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}): Omit<User, "id"> => {
  const { firstName, lastName, email, username } = newUserInfo;
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
  };
};

const getTeamMemberInfo = (
  user: User,
  teams: Team[],
  teamMemberLinks: TeamMemberLink[],
  users: User[]
): Array<TeamProfile> => {
  const userTeamLinks = teamMemberLinks.filter(
    (link) => link.userId === user.id
  );
  const userTeams: Team[] = [];
  userTeamLinks.forEach((link) => {
    const team = teams.find((team) => team.id === link.teamId)!;
    userTeams.push(team);
  });

  const userTeamProfiles = userTeams.map((team) => {
    const userTeamMembersLinks = teamMemberLinks.filter(
      (link) => link.teamId === team.id
    );
    const teamMembers: User[] = [];
    userTeamMembersLinks.forEach((link) => {
      const linkedUser = users.filter(
        (teamMember) => teamMember.id === link.userId
      )[0];
      teamMembers.sort((curUser, nxtUser) => {
        return curUser.id === team.teamLeadId
          ? -1
          : nxtUser.id === team.teamLeadId
          ? 1
          : 0;
      });
      teamMembers.push(linkedUser);
    });
    return {
      team: team,
      teamMembers: teamMembers,
    };
  });

  return userTeamProfiles;
};

const getUserTasks = (
  userId: number,
  teamId: number,
  tasks: Task[],
  userTasks: UserTask[]
) => {
  const activeTaskLinks = userTasks.filter(
    (link) => link.teamId === teamId && link.userId === userId
  );
  const activeTasks = [];
  for (const link of activeTaskLinks) {
    const task = tasks.find((task) => task.id === link.taskId)!;
    activeTasks.push(task);
  }

  return activeTasks;
};

const editTask = (
  teamId: number,
  task: Task,
  currentAssignedUsers: User[],
  assignedUsers: User[],
  existingTags: Tag[],
  newTagSet: Array<Omit<Tag, "id"> | Tag>,
  newNote: Omit<Note, "id">,
  allData: AllData,
  setAllData: (allData: AllData) => void,
  setPage: (page: Page) => void,
  reloadData: () => void
) => {
  const { tasks, usersTasks } = allData;
  const newTasks = tasks.map((curTask) =>
    curTask.id === task.id ? task : curTask
  );
  const newUsers = assignedUsers.filter(
    (user) =>
      currentAssignedUsers.find((extUser) => extUser.id === user.id) ===
      undefined
  );
  const removedUsers = currentAssignedUsers.filter(
    (extUser) =>
      assignedUsers.find((user) => user.id === extUser.id) === undefined &&
      extUser.id !== task.ucId
  );

  const newTags = newTagSet.filter(
    (tag) =>
      !tag.hasOwnProperty("id") ||
      existingTags.find((extTag) => extTag.id === (tag as Tag).id) === undefined
  );

  const removedTags = existingTags.filter(
    (tag) => newTagSet.find((newTag) => newTag.tag === tag.tag) === undefined
  );

  apiFunctions
    .editTask(
      teamId,
      task,
      newTasks,
      newUsers,
      removedUsers,
      usersTasks,
      newTags,
      removedTags,
      newNote,
      allData,
      setAllData
    )
    .then(() => {
      reloadData();
      setPage("dashboard");
    })
    .catch(() => {
      toast.error("error editing task");
      setPage("error");
    });
};

export const functions = {
  logInUser,
  createUser,
  getTeamMemberInfo,
  getUserTasks,
  editTask,
};
