import { ReactNode } from "react";
import { LogInProviderContext } from "../../functions/providersContext";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LogInProviderContext.Provider value={{}}>
      {children}
    </LogInProviderContext.Provider>
  );
};
