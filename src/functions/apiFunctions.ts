import { TAllData } from "../types/globalTypes";

export const getAllData = async (setAllData: (allData: TAllData) => void) => {
    const allData: TAllData = {
        teams: [],
        teamMembers: [],
        userAuths: [],
        memTeamLink: []
    }
}