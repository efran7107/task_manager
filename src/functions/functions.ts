import { Requests } from "@/api/api";
import { AllData } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getAllData = async (): Promise<AllData> => {
  const allData = {
    teams: await Requests.GetRequests.getAllTeams(),
    users: await Requests.GetRequests.getAllUsers(),
    userTeamLinks: await Requests.GetRequests.getAllTeamMemeberLinks(),
    tasks: await Requests.GetRequests.getAllTasks(),
    taskAssignments: await Requests.GetRequests.getAllTaskAssignmentLinks(),
    tags: await Requests.GetRequests.getAllTags(),
    taskTags: await Requests.GetRequests.getAllTaskTagLinks(),
    notes: await Requests.GetRequests.getAllNotes(),
  };
  return allData;
};

export const functions = {
  getHeaderContainer,
  getAllData,
};
