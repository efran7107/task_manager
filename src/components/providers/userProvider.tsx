import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { TTeamMember } from "../../types/globalTypes";

const defTeamMember: TTeamMember = {
    id: -1,
    name: '',
    email: '',
    username: '',
}

export const UserProvider = ({children}:{children: ReactNode}) => {
    const [teamMember, setTeamMember] = useState(defTeamMember);

    useEffect(() => {
        
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