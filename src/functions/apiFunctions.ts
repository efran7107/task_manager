import { GetRequests } from "../api";
import { AllData } from "../types/objectTypes";

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

export const apiFunctions = {
  getAllData,
  validateUser,
};
