import {TTeam, TTeamMember} from "./globalTypes.ts";


export type TUserProvider = {
    user: TTeamMember
    userTeams: { team: TTeam,  users: TTeamMember[]}[],
    activeTeam: { team: TTeam,  users: TTeamMember[]}
};
