import { UserInput } from "../inputs/userInput"

export const UserJoinTeam = ({
    curValue, 
    changeJoinTeam
}: {
    changeJoinTeam: (key: string, value: string) => void, 
    curValue: {
        teamName: string,
        auth: string
    }
}) => {

    const {
        teamName,
        auth
    } = curValue
    
    return (
        <div className="team-input-cont">
                        <UserInput 
                            id="teamName" 
                            label="Team Name" 
                            userInput={{
                                type: 'text',
                                value: teamName,
                                onChange: (e) => changeJoinTeam('teamName', e.currentTarget.value)
                            }}
                        />
                        <UserInput 
                            id="auth" 
                            label="Team Password" 
                            userInput={{
                                type: "password",
                                value: auth,
                                onChange: (e) => changeJoinTeam('auth', e.currentTarget.value)
                            }}
                        />
                    </div>
    )
}