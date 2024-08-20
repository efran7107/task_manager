import { GetRequests, PostRequests } from "../api";
import {
  AllData,
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

export const apiFunctions = {
  getAllData,
  validateUser,
  signUpUser,
};
