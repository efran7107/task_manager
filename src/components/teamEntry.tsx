import { useState } from "react";
import { TPage } from "../types/globalTypes";
import { UserInput } from "./inputs/userInput";
import '../css/teamEntry.css'
import { enterTeam } from "../functions/apiFunctions";

export const TeamEntry = ({setPage}:{setPage: (page: TPage) => void}) => {
    const [joinTeam, setJoinTeam] = useState({
        teamName: '',
        auth: ''
    })

    const [createTeam, setCreateTeam] = useState({
        teamName: '',
        auth: '',
        confirm: ''
    })

    const [teamType, setTeamType] = useState<'join' | 'create'>('join')

    const changeJoinTeam = (key: string, value: string) => {
        setJoinTeam({...joinTeam, [key]: value})
    }

    const changeCreateTeam = (key: string, value: string) => {
        setCreateTeam({...createTeam, [key]: value})
    }

    const userJoinTeam = () => {
        setPage('loading')
        enterTeam(joinTeam)
            .then((res) => {
                
            })
    }

    const teamEntry = () => {
        switch(teamType){
            case 'join':
                userJoinTeam()
                break
        }
    }

    return (
        <div className="team-entry-cont">
            <div className="join-team" onClick={() => setTeamType('join')}>
            <h2>Join Team</h2>
                <UserInput 
                    id="teamName" 
                    label="Team Name" 
                    userInput={{
                        type: 'text',
                        value: joinTeam.teamName,
                        onChange: (e) => changeJoinTeam('teamName', e.currentTarget.value)
                    }}
                />
                <UserInput 
                    id="auth" 
                    label="Team Password" 
                    userInput={{
                        type: "password",
                        value: joinTeam.auth,
                        onChange: (e) => changeJoinTeam('auth', e.currentTarget.value)
                    }}
                />
            </div>
            <div className="create-team" onClick={() => setTeamType('create')}>
                <h2>Create Team</h2>
                <UserInput 
                    id="newTeamName" 
                    label="New Team Name" 
                    userInput={{
                        type: 'text',
                        value: createTeam.teamName,
                        onChange: (e) => changeCreateTeam('teamName', e.currentTarget.value)
                    }}
                />
                <UserInput 
                    id="newAuth" 
                    label="Team Password" 
                    userInput={{
                        type: "password",
                        value: createTeam.auth,
                        onChange: (e) => changeCreateTeam('auth', e.currentTarget.value)
                    }}
                />
                <UserInput 
                    id="confirm" 
                    label="Confirm Team Password" 
                    userInput={{
                        type: "password",
                        value: createTeam.confirm,
                        onChange: (e) => changeCreateTeam('confirm', e.currentTarget.value)
                    }}
                />
            </div>
            <input type="button" value="Join/Create Team" onClick={teamEntry}/>
        </div>
    )
}