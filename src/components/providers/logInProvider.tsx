import { ReactNode, useState } from "react";
import { LogInProviderContext } from "../../functions/providersContext";
import { LogInInput } from "../../types/logInProviderTypes";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [logIn, setLogIn] = useState<LogInInput>({
    username: "",
    password: "",
  });

  return (
    <LogInProviderContext.Provider
      value={{
        logIn,
        setLogIn,
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};
