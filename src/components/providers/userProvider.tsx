import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage, TTeamMember} from "../../types/globalTypes";
import {User} from "../classes/user.ts";

const defTeamMember: TTeamMember = {
  id: -1,
  name: '',
  email: '',
  username: '',
}


export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
  const [user, setUser] = useState(new User(defTeamMember))
  useEffect(() => {
    const username = localStorage.getItem("username")!;

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
