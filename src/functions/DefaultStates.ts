import { AllData, DefaultLogIn, Note, Task, TeamMember } from "@/types/types";

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
    taskCreater: 0
  };
};

const getDefaultNote = (): Omit<Note, 'id'> => {
  return {
      noteTitle: '',
      content: '',
      teamMemberId: 0,
      taskId: 0,
    }
  
}

const defaultRegistration = {
  newUsername: "",
  firstName: "",
  lastName: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
};

const defaultLogIn: DefaultLogIn = {
  username: "",
  password: "",
};
export const defaultData = {
  getDefaultAllData,
  getDefaultTeamMember,
  getDefaultTask,
  getDefaultNote,
  defaultRegistration,
  defaultLogIn
};
