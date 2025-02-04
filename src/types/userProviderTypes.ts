import { TTeam, TTeamMember } from "./globalTypes";

export type TUserProvider = {
  teamMember: TTeamMember;
  userTeams: TTeam[];
};
