import { useState } from "react";
import { TMemTeamLink, TPage, TTeam, TTeamAuth, TTeamMember } from "../types/globalTypes";
import { UserInput } from "./inputs/userInput";
import '../css/teamEntry.css'
import '../css/UserLogIn.css'
import { validateTeamName, varifyTeam } from "../functions/apiFunctions";
import { apiOptions } from "../api";
import toast from "react-hot-toast";

const defJoinTeam = {
    teamName: '',
    auth: ''
}

const defCreateTeam = {
    teamName: '',
    auth: '',
    confirm: ''
}

export const TeamEntry = ({setPage}:{setPage: (page: TPage) => void}) => {
    const [joinTeam, setJoinTeam] = useState(defJoinTeam)

    const [createTeam, setCreateTeam] = useState(defCreateTeam)

    const [teamType, setTeamType] = useState<'join' | 'create'>('join')

    const changeJoinTeam = (key: string, value: string) => {
        setJoinTeam({...joinTeam, [key]: value})
    }

    const changeCreateTeam = (key: string, value: string) => {
        setCreateTeam({...createTeam, [key]: value})
    }

    const userJoinTeam = async () => {
        try{
            setPage('loading')
            const isTeamVarified = await varifyTeam(joinTeam)
            if(!isTeamVarified) {
                setJoinTeam(defJoinTeam)
                setPage('create/join-team')
                toast.error('sorry, wrong team and/or password')
                return
            }
            const team: TTeam = await apiOptions.getRequests.getSingleData('teams', 'name', joinTeam.teamName)
            const user: TTeamMember = await apiOptions.getRequests.getSingleData('teamMembers', 'username', localStorage.getItem('username')!)
            const newMemTeamLink: Omit<TMemTeamLink, 'id'> = {
                userId: user.id,
                teamId: team.id
            }
            await apiOptions.postRequests.addData('memTeamLinks', newMemTeamLink)
            setPage('home-page')

        }catch{
            toast.error('sorry an error occured')
        }
    }

    const userCreateTeam = async () => {
        try {
            setPage('loading')
            for(const val of Object.values(createTeam)){
                if(val.trim() === '') {
                    toast.error('please fill out the form to create a team')
                    setPage('create/join-team')
                    setCreateTeam(defCreateTeam)
                    return
                }
            }
            const isValidTeamName = validateTeamName(createTeam);
            if(!isValidTeamName) {
                toast.error('sorry, team name is already taken or auth does not match')
                setPage('create/join-team')
                setCreateTeam(defCreateTeam)
                return
            }
            const user: TTeamMember = await apiOptions
                .getRequests
                .getSingleData(
                    'teamMembers', 
                    'username', 
                    localStorage.getItem('username')!
                )
            const tempTeam: Omit<TTeam, 'id'> = {
                name: createTeam.teamName,
                teamLeadId: user.id,
                numOfMembers: 1
            }
            const newTeam: TTeam = await apiOptions.postRequests.addData('teams', tempTeam)
            const tempTeamAuth: Omit<TTeamAuth, 'id'> = {
                teamId: newTeam.id,
                auth: createTeam.auth
            }
            const tempMemTeamLink: Omit<TMemTeamLink, 'id'> = {
                userId: user.id,
                teamId: newTeam.id
            }

            await apiOptions.postRequests.addData('teamAuths', tempTeamAuth)
            await apiOptions.postRequests.addData('memTeamLinks', tempMemTeamLink)
            setPage('home-page')

        }catch{
            toast.error('sorry an error occured')
        }

    }

    const teamEntry = () => {
        switch(teamType){
            case 'join':
                userJoinTeam()
                break;
            case 'create':
                userCreateTeam()
        }
    }

    return (
        <div className="team-entry-cont">
            <div className="join-team" onClick={() => setTeamType('join')}>
            <h2>Join Team</h2>
            <div className="team-input-cont">
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
            </div>
            <div className="create-team" onClick={() => setTeamType('create')}>
                <h2>Create Team</h2>
                <div className="team-input-cont">
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
            </div>
            <input className="submit-btn" type="button" value="Join/Create Team" onClick={teamEntry}/>
        </div>
    )
}