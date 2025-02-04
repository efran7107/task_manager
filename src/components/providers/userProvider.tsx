import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { TAllData, TPage, TTeamMember } from "../../types/globalTypes";
import { getAllData, getUser } from "../../functions/apiFunctions";
import { getUserTeams } from "../../functions/finctions";

const defTeamMember: TTeamMember = {
  id: -1,
  name: "",
  email: "",
  username: "",
};

const defAllData: TAllData = {
  teams: [],
  teamMembers: [],
  userAuths: [],
  memTeamLinks: [],
};

export const UserProvider = ({
  children,
  setPage,
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
}) => {
  const [allData, setAllData] = useState(defAllData);
  const [teamMember, setTeamMember] = useState(defTeamMember);
  const { teams, teamMembers, userAuths, memTeamLinks } = allData;
  const userTeams = getUserTeams(memTeamLinks, teams, teamMember.id);

  useEffect(() => {
    const userName = localStorage.getItem("username");
    if (userName) getUser(userName, setTeamMember);
    else return;
    getAllData(setAllData);
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        teamMember,
        userTeams,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
