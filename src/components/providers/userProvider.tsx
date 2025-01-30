import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { TAllData, TLogInState, TTeamMember } from "../../types/globalTypes";
import { getAllData, getUser } from "../../functions/apiFunctions";

const defTeamMember: TTeamMember = {
    id: -1,
    name: '',
    email: '',
    username: '',
}

const defAllData: TAllData = {
    teams: [],
    teamMembers: [],
    userAuths: [],
    memTeamLinks: []
}

export const UserProvider = ({children}:{children: ReactNode}) => {
    const [logInState, setLogInState] = useState<TLogInState>('home-page')
    const [allData, setAllData] = useState(defAllData)
    const [teamMember, setTeamMember] = useState(defTeamMember);

    const {teams, teamMembers, userAuths, memTeamLinks} = allData

    useEffect(() => {
        const userName = localStorage.getItem('username');
        if(userName) getUser(userName, setTeamMember);
        else return
        getAllData(setAllData)        
    },[])

    return(
        <UserProviderContext.Provider 
            value={{
                teamMember
            }}
        >
            {children}
        </UserProviderContext.Provider>
    )
}