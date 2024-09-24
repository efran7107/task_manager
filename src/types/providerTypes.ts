import { AllData, Page, User } from "./objectTypes";

export type TUserProvider = {
  page: Page;
  setPage: (page: Page) => void;
  allData: AllData;
  setAllData: (allData: AllData) => void;
  user: User;
  setUser: (user: User) => void;
  reloadData: () => void;
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
    signUp: {
      firstName: string;
      lastName: string;
      email: string;
      newUsername: string;
      newPassword: string;
      confirm: string;
    },
    createTeam: { teamName: string; teamCode: string },
    joinTeam: { joinTeamName: string; joinTeamCode: string }
  ) => void;
};
