
import { apiOptions } from "../api";
import { TAllData, TTeamMember } from "../types/globalTypes";
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
