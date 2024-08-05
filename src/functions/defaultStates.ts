import { AllData } from "../types/objectTypes";

export const defaultAllData = (): AllData => {
  return {
    teams: [],
    users: [],
    teamMemberLinks: [],
    tasks: [],
    usersTasks: [],
    tags: [],
    taggedTasks: [],
    notes: [],
  };
};
