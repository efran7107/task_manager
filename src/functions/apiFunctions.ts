import toast from "react-hot-toast";
import { GetRequests, PostRequests } from "../api";
import {
  AllData,
  Note,
  Page,
  Tag,
  Task,
  Team,
  TeamMemberLink,
  User,
  UserAuth,
} from "../types/objectTypes";

const getAllData = async (): Promise<AllData> => {
  const {
    getTeams,
    getUsers,
    getTeamMemberLinks,
    getTasks,
    getUsersTasks,
    getTags,
    getTaggedTasks,
    getNotes,
  } = GetRequests;

  return {
    teams: await getTeams(),
    users: await getUsers(),
    teamMemberLinks: await getTeamMemberLinks(),
    tasks: await getTasks(),
    usersTasks: await getUsersTasks(),
    tags: await getTags(),
    taggedTasks: await getTaggedTasks(),
    notes: await getNotes(),
  };
};

const validateUser = async (
  userId: number,
  password: string
): Promise<boolean> => {
  const userAuth = await GetRequests.getUserAuth(userId);
  if (userAuth[0].password === password) return true;
  else return false;
};

const signUpUser = async (
  newUser: Omit<User, "id">,
  password: string,
  createTeam: { teamName: string; teamCode: string },
  joinTeam: { joinTeamName: string; joinTeamCode: string },
  teams: Team[],
  setUser: (user: User) => void
): Promise<boolean> => {
  const { teamName, teamCode } = createTeam;
  const { joinTeamName } = joinTeam;
  const user = await PostRequests.createUser(newUser);
  const newUserAuth: Omit<UserAuth, "id"> = {
    userId: user.id,
    password: password,
  };
  await PostRequests.createUserAuth(newUserAuth);
  if (teamName.trim().length === 0 && teamCode.trim().length === 0) {
    const team = teams.find((team) => team.teamName === joinTeamName)!;
    const teamMemberLink: Omit<TeamMemberLink, "id"> = {
      userId: user.id,
      teamId: team.id,
    };
    await PostRequests.createTeamMemberLink(teamMemberLink);
    setUser(user);
    return true;
  } else {
    const newTeam: Omit<Team, "id"> = {
      teamName: teamName,
      teamCode: teamCode,
      teamLeadId: user.id,
    };
    const updatedTeam = await PostRequests.createTeam(newTeam);
    const teamMemberLink: Omit<TeamMemberLink, "id"> = {
      userId: user.id,
      teamId: updatedTeam.id,
    };
    await PostRequests.createTeamMemberLink(teamMemberLink);
    setUser(user);
    return true;
  }
};

const addTask = async (
  newTask: Omit<Task, "id">,
  teamId: number,
  newNote: Omit<Note, "id">,
  newTagSet: Array<Omit<Tag, "id"> | Tag>,
  assignedUsers: User[],
  setPage: (page: Page) => void
) => {
  try {
    const addedTask = await PostRequests.addTask(newTask);
    assignedUsers.forEach(async (user) => {
      await PostRequests.addUserTask({
        userId: user.id,
        taskId: addedTask.id,
        teamId: teamId,
      });
    });
    if (newTagSet.length !== 0) {
      newTagSet.forEach(async (tag) => {
        if (!tag.hasOwnProperty("id")) {
          const addedTag = await PostRequests.addTag(tag);
          await PostRequests.addTaggedTask({
            taskId: addedTask.id,
            tagId: addedTag.id,
          });
        } else {
          await PostRequests.addTaggedTask({
            taskId: addedTask.id,
            tagId: (tag as Tag).id,
          });
        }
      });
    }
    if (newNote.title.trim().length !== 0 && newNote.desc.trim().length !== 0) {
      await PostRequests.addNote({ ...newNote, taskId: addedTask.id });
    }
    toast.success("Task added successfully");
    setPage("dashboard");
  } catch {
    toast.error("Failed to add task");
    setPage("error");
  }
};

export const apiFunctions = {
  getAllData,
  validateUser,
  signUpUser,
  addTask,
};
