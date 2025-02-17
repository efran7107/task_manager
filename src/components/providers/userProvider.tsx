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
        setPage('create_join-team')
  }
  
  const userCreateTask = () => {
      setPage('create-task')
  }
  
  const setTeam = (team: Team) => {
      setActiveTeam(team)
      localStorage.setItem('team', team.getName())
  }

  useEffect(() => {
    const username = localStorage.getItem("username")!;
    getUserData(username)
        .then((userData) => {
            const {user, userTeams, activeTeam} = userData
            setUser(user)
            setUserTeams(userTeams)
            const activeTeamName = localStorage.getItem('team')
          if(!activeTeamName){
            setTeam(activeTeam)
            return
          }
          const actTeam = userTeams.find(team => team.getName() === activeTeamName)
          setTeam(actTeam!)
        })
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        user,
        userTeams,
        activeTeam,
        setTeam,
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
