import { ReactNode, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { Page } from "../../types/themeTypes";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>("loading");

  return (
    <UserProviderContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
