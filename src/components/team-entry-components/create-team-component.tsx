import { UserInput } from "../inputs/userInput"

export const UserCreateTeam = ({
    curVal, 
    changeCreateTeam
}: {
    curVal: {
        teamName: string,
        auth: string,
        confirm: string
    }, 
    changeCreateTeam: (key: string, value: string) => void
}) => {
    const {teamName, auth, confirm} = curVal
    return (
        <div className="team-input-cont">
                <UserInput 
                    id="newTeamName" 
                    label="New Team Name" 
                    userInput={{
                        type: 'text',
                        value: teamName,
                        onChange: (e) => changeCreateTeam('teamName', e.currentTarget.value)
                    }}
                />
                <UserInput 
                    id="newAuth" 
                    label="Team Password" 
                    userInput={{
                        type: "password",
                        value: auth,
                        onChange: (e) => changeCreateTeam('auth', e.currentTarget.value)
                    }}
                />
                <UserInput 
                    id="confirm" 
                    label="Confirm Team Password" 
                    userInput={{
                        type: "password",
                        value: confirm,
                        onChange: (e) => changeCreateTeam('confirm', e.currentTarget.value)
                    }}
                />
                </div>
    )
}