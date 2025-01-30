import { apiOptions } from "../api";
import { TAllData, TTeamMember } from "../types/globalTypes";

const defAllData: TAllData = {
    teams: [],
    teamMembers: [],
    userAuths: [],
    memTeamLinks: []
}

export const getAllData = async ( setAllData: (allData: TAllData) => void) => {
    let allData = defAllData
    const keys = Object.keys(allData);
    for( const key of keys ) {
        const data = await apiOptions.getRequests.getDataInfo(key);
        allData = {...allData, [key]: data}        
    }
    setAllData(allData)
    
}

export const getUser = async (username: string, setTeamMember: (teamMember: TTeamMember) => void) => {
    const user = await apiOptions.getRequests.getUser(username);
    setTeamMember(user);
}

