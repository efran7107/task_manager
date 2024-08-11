import { AllData, Page, User } from "./objectTypes";

export type TUserProvider = {
  page: Page;
  setPage: (page: Page) => void;
  allData: AllData;
  setAllData: (allData: AllData) => void;
  user: User;
  setUser: (user: User) => void;
};

export type TLogInProvider = {
  logInUser: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => Promise<boolean>;
  signUpUser: (
    newUser: Omit<User, "id">,
    createTeam: { teamName: string; teamCode: string },
    joinTeam: string
  ) => Promise<boolean>;
};
