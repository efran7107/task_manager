
import toast from "react-hot-toast";
import { apiOptions } from "../api";
import { TAllData, TMemTeamLink, TPage, TTeam, TTeamAuth, TTeamMember } from "../types/globalTypes";
import { SignUpInput } from "../types/logInProviderTypes";

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

export const addUser = async (
    newUser: SignUpInput 
) => {
    const {username, firstName, lastName, email, password} = newUser;
    const userName = firstName + ' ' + lastName
    const tempUser = {
        name: userName,
        email: email,
        username: username
    }
    const user: TTeamMember = await apiOptions.postRequests.addData('teamMembers', tempUser)
    const tempUserAuth = {
        userId: user.id,
        password: password
    }
    apiOptions.postRequests.addData("userAuths", tempUserAuth)
    
}

export const checkUserTeam = async (username: string): Promise<TPage> => {
    const user = await apiOptions.getRequests.getUser(username);
    const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo('memTeamLinks');
    const userTeamLinks = memTeamLinks.filter(link => link.userId === user.id)
    return userTeamLinks.length > 0 ? 'home-page' : 'create/join-team';
}

export const enterTeam = async (joinTeam: {teamName: string, auth: string}): Promise<boolean> => {
    const teams: TTeam[] = await apiOptions.getRequests.getSingleData("teams", 'name', joinTeam.teamName)
    if(teams.length < 1)
        return false
    const team = teams[0]
    const teamAuth: TTeamAuth = await apiOptions.getRequests.getSingleData('teamAuths', 'teamId', team.id.toString())
    if(teamAuth.auth === joinTeam.auth)
        return true
    else
        return false
    
}
