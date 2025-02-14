import {ReactNode, useEffect, useState} from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage} from "../../types/globalTypes";
import {getUserData} from "../../functions/apiFunctions.ts";
import {User} from "../../classes/User.ts";
import {Team} from "../../classes/Team.ts";
import {defTeam, defUser} from "../../functions/default.ts";


export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
    const [user, setUser] = useState<User>(defUser)
    const [userTeams, setUserTeams] = useState<Team[]>([defTeam])
    const [activeTeam, setActiveTeam] = useState<Team>(defTeam)
  
  const logUserOut = () => {
      localStorage.removeItem('username')
      setPage('log-in')
  }

  const userJoinTeam = () => {
        setPage('create/join-team')
  }
  
  const userCreateTask = () => {
      setPage('create-task')
  }

  useEffect(() => {
    const username = localStorage.getItem("username")!;
    getUserData(username)
        .then((userData) => {
            const {user, userTeams, activeTeam} = userData
            setUser(user)
            setUserTeams(userTeams)
            setActiveTeam(activeTeam)
        })
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        user,
        userTeams,
        activeTeam,
        setActiveTeam,
        setPage,
        logUserOut,
          userJoinTeam,
        userCreateTask
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
