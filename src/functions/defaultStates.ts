import { AllData, User } from "../types/objectTypes";

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

export const defaultUser: User = {
  id: -1,
  firstName: "",
  lastName: "",
  email: "",
  username: "",
};

export const logInError =
  "please enter a username an password to sign in or create an account to join";

export const invalidUsernamePassword = "incorrect username/password";
