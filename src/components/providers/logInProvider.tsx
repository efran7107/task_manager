import { ReactNode } from "react";
import {
  LogInProviderContext,
  useUser,
} from "../../functions/providersContext";
import toast from "react-hot-toast";
import { apiFunctions } from "../../functions/apiFunctions";
import { invalidUsernamePassword } from "../../functions/defaultStates";
import { functions } from "../../functions/functions";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const { allData, setAllData, setUser, setPage } = useUser();

  const { users } = allData;

  const logInUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<boolean> => {
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

  return (
    <LogInProviderContext.Provider
      value={{
        logInUser,
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};
