import { GetRequests } from "@/api/api";
import { AllData } from "@/types/types";

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

export const functions = {
  getHeaderContainer,
  getAllData,
};
