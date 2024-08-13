import { User } from "../types/objectTypes";

const logInUser = (
  setUser: (user: User) => void,
  username?: string,
  allUsers?: User[],
  user?: User
) => {
  if (user !== undefined) {
    setUser(user);
    return;
  }
  const validUser = allUsers?.find((user) => user.username === username);
  setUser(validUser!);
};

const createUser = (newUserInfo: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}): Omit<User, "id"> => {
  const { firstName, lastName, email, username } = newUserInfo;
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
  };
};

export const functions = {
  logInUser,
  createUser,
};
