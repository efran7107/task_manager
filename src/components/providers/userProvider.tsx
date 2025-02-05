import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import {TPage, TTeam, TTeamMember} from "../../types/globalTypes";
import {User} from "../classes/user.ts";
import {getUserData} from "../../functions/apiFunctions.ts";
import {Team} from "../classes/team.ts";

const defTeamMember: TTeamMember = {
  id: -1,
  name: '',
  email: '',
  username: '',
}

const defTeam: TTeam = {
  id: -1,
  name: "",
  numOfMembers: 0,
  teamLeadId: -1
}

export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
  const [user, setUser] = useState(new User(defTeamMember))
  const [userTeams, setUserTeams] = useState<Team[]>([])
  const [activeTeam, setActiveTeam] = useState(new Team(defTeam))

  useEffect(() => {
    const username = localStorage.getItem("username")!;
    getUserData(username)
        .then((userData) => {
          const {user, activeTeam, teams} = userData
          setUser(user)
          setUserTeams(teams)
          setActiveTeam(activeTeam)
        })
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        user,
        userTeams,
        activeTeam
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
