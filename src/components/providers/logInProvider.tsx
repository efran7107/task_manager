import { ReactNode } from "react";
import {
  LogInProviderContext,
  useUser,
} from "../../functions/providersContext";
import toast from "react-hot-toast";
import { apiFunctions } from "../../functions/apiFunctions";
import { invalidUsernamePassword } from "../../functions/defaultStates";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const { allData, setAllData } = useUser();

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
    return await apiFunctions.validateUser(validUsernames[0].id, password);
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
