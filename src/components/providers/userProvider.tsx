import {ReactNode, useEffect, useState} from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage, TTeam, TTeamMember} from "../../types/globalTypes";
import {getUserData} from "../../functions/apiFunctions.ts";

const defUser: TTeamMember = {
  id: -1,
  name: '',
  email: '',
  username: ''
}

const defTeam: TTeam = {
    id: -1,
    name: '',
    numOfMembers: 0,
    teamLeadId: 0
}

export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
    const [user, setUser] = useState<TTeamMember>(defUser)
    const [userTeams, setUserTeams] = useState<{ team: TTeam,  users: TTeamMember[]}[]>([])
    const [activeTeam, setActiveTeam] = useState<{ team: TTeam, users: TTeamMember[]}>({team: defTeam, users: []})

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
          setPage
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
