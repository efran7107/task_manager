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

export const apiFunctions = {
  getAllData,
};
