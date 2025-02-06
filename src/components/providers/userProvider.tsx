import {ReactNode, useEffect, useState} from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage} from "../../types/globalTypes";
import {getUserData} from "../../functions/apiFunctions.ts";
import {User} from "../classes/User.ts";

export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
    const [user, setUser] = useState<User>()
    

  useEffect(() => {
    const username = localStorage.getItem("username")!;
    getUserData(username)
        .then((userData) => {
          setUser(userData)

        })
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        user
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
