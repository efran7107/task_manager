import { Team, User } from "../types/objectTypes";

const isValidName = (inputStr: string) => {
  return /([a-zA-Z]|-)+$/.test(inputStr) || inputStr.trim() === "";
};

const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("user") === null ? false : true;
};

const isValidLogIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): boolean => {
  return username !== "" && password !== "" ? true : false;
};

const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

const isSameUsername = (username: string, allUsers: User[]): boolean => {
  return allUsers.some((user) => username === user.username);
};

const isSameTeamName = (teamName: string, allTeams: Team[]) => {
  return allTeams.some((team) => teamName === team.teamName);
};

const isValidSignUp = (
  signUpForm: {
    firstName: string;
    lastName: string;
    email: string;
    newUsername: string;
    newPassword: string;
    confirm: string;
  },
  allUsers: User[],
  createTeam: {
    teamName: string;
    teamCode: string;
  },
  joinTeamCode: string
) => {
  const { firstName, lastName, email, newUsername, newPassword, confirm } =
    signUpForm;

  if (
    firstName.trim().length > 2 &&
    lastName.trim().length > 2 &&
    isValidEmail(email) &&
    !isSameUsername(newUsername, allUsers) &&
    newPassword === confirm
  ) {
    if (
      joinTeamCode.trim().length > 2 ||
      (createTeam.teamName.trim().length > 2 &&
        createTeam.teamCode.trim().length > 2)
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export const validations = {
  isUserLoggedIn,
  isValidLogIn,
  isValidSignUp,
  isValidEmail,
  isSameUsername,
  isSameTeamName,
  isValidName,
};
