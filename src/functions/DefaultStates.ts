import { AllData, Task, TeamMember } from "@/types/types";

const getDefaultAllData = (): AllData => {
  return {
    teams: [],
    users: [],
    userTeamLinks: [],
    tasks: [],
    taskAssignments: [],
    tags: [],
    taskTags: [],
    notes: [],
  };
};

const getDefaultTeamMember = (): TeamMember => {
  return {
    id: 0,
    username: "",
    name: "",
    email: "",
  };
};

const getDefaultTask = (): Task => {
  return {
    id: 0,
    taskName: "",
    description: "",
    status: "to-do",
    dueDate: "",
    isImportant: false,
  };
};

export const defaultData = {
  getDefaultAllData,
  getDefaultTeamMember,
  getDefaultTask,
};
