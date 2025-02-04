import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage, TTeam, TTeamMember} from "../../types/globalTypes";
import { signUserIn} from "../../functions/apiFunctions";
import {User} from "../classes/user.ts";

const defTeamMember: TTeamMember = {
  id: -1,
  name: '',
  email: '',
  username: '',
}

const defUser: User = new User(defTeamMember)

export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
  const [user, setUser] = useState<User>(defUser)
  
  const [activeTeam, setActiveTeam] = useState<TTeam>()

  useEffect(() => {
    const username = localStorage.getItem("username")!;
    signUserIn(username)
      .then((curUser) => {
        setUser(curUser)
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
