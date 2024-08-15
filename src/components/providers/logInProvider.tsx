import { ReactNode } from "react";
import {
  LogInProviderContext,
  useUser,
} from "../../functions/providersContext";
import toast from "react-hot-toast";
import { apiFunctions } from "../../functions/apiFunctions";
import { invalidUsernamePassword } from "../../functions/defaultStates";
import { functions } from "../../functions/functions";
import { User } from "../../types/objectTypes";
import { format } from "../../functions/formatting";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const { allData, setAllData, setUser, setPage } = useUser();

  const { users, teams } = allData;

  const logInUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<boolean> => {
    setPage("loading");
    const validUsernames = users.filter((user) => user.username === username);
    if (validUsernames.length < 1) {
      toast.error(invalidUsernamePassword);
      return false;
    }
    const isValidated = await apiFunctions.validateUser(
      validUsernames[0].id,
      password
    );
    if (!isValidated) {
      return false;
    } else {
      functions.logInUser(setUser, undefined, undefined, validUsernames[0]);
      localStorage.setItem("user", validUsernames[0].username);
      setPage("dashboard");
      return true;
    }
  };

  const signUpUser = async (
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
  ) => {
    setPage("loading");
    try {
      const { firstName, lastName, email, newUsername, newPassword } = signUp;
      const newUserInfo: Omit<User, "id"> = {
        firstName: format.formatName(firstName),
        lastName: format.formatName(lastName),
        email: email,
        username: newUsername,
      };

      await apiFunctions.signUpUser(
        newUserInfo,
        newPassword,
        createTeam,
        joinTeam,
        teams,
        setUser
      );
      const newData = await apiFunctions.getAllData();
      setAllData(newData);
      localStorage.setItem("user", newUsername);
      setPage("dashboard");
    } catch {
      toast.error("error please try again later");
      setPage("error");
    }
  };

  return (
    <LogInProviderContext.Provider
      value={{
        logInUser,
        signUpUser,
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};
