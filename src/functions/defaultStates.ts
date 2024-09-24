import { AllData, Task, User } from "../types/objectTypes";

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

export const defaultLogIn = {
  username: "",
  password: "",
};

export const defaultSignUp = {
  firstName: "",
  lastName: "",
  email: "",
  newUsername: "",
  newPassword: "",
  confirm: "",
};

export const defaultJoinTeam = {
  joinTeamName: "",
  joinTeamCode: "",
};

export const defaultCreateTeam = {
  teamName: "",
  teamCode: "",
};

export const defaultUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
};

export const defaultNewTask: Omit<Task, "id"> = {
  title: "",
  desc: "",
  status: "to-do",
  dueDate: "",
  dateCreated: "",
  isUrgent: false,
  ucId: 0,
};

export const logInError =
  "please enter a username an password to sign in or create an account to join";

export const invalidUsernamePassword = "incorrect username/password";
