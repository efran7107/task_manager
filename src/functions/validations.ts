import { GetRequests } from "../api";
import { User } from "../types/objectTypes";

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

const isSameUsername = (username: string, allUsers: User[]) => {};

const isValidSignUp = (
  signUpForm: {
    firstName: string;
    lastName: string;
    email: string;
    newUsername: string;
    newPassword: string;
    confirm: string;
  },
  allUsers: User[]
) => {
  const { firstName, lastName, email, newUsername, newPassword, confirm } =
    signUpForm;

  if (
    firstName.trim().length > 2 &&
    lastName.trim().length > 2 &&
    isValidEmail(email)
  ) {
    return true;
  }
  return false;
};

export const validations = {
  isUserLoggedIn,
  isValidLogIn,
  isValidSignUp,
};
