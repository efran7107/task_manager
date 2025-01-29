import { apiOptions } from "../api";
import { TAllData, TMemTeamLink, TTeam, TTeamMember, TUserAuth } from "../types/globalTypes";

export const getAllData = async (setAllData: (allData: TAllData) => void) => {
    const teams: TTeam[] = await apiOptions.getRequests.getDataInfo('teams');
    const teamMembers: TTeamMember[] = await apiOptions.getRequests.getDataInfo('teamMembers');
    const userAuths: TUserAuth[] = await apiOptions.getRequests.getDataInfo('userAuths');
    const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo('memTeamLinks');

    const allData: TAllData = {
        teams: teams,
        teamMembers: teamMembers,
        userAuths: userAuths,
        memTeamLinks: memTeamLinks
    }

    setAllData(allData)
    
}