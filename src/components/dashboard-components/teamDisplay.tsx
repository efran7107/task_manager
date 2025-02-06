import {useUser} from "../../functions/providersContext.ts";
import {useState} from "react";


export const TeamDisplay = () => {
    const {activeTeam, userTeams} = useUser()
    const {team, users} = activeTeam
    const [isActive, setIsActive] = useState(false)
    return(
        <div className='team-display-cont'>
            <div className="team-selector-cont">
                <h3 className='team-name-cont'>{team.name}</h3>
                <div className={`team-selection${isActive ? ' active' : ''}`}>
                    {userTeams.map(team => (
                        <p key={team.team.id}>{team.team.name}</p>
                    ))}
                </div>
            </div>
            <div className="team-users">
                {users.map(user => (
                    <p key={user.id}>{user.username}</p>
                ))}
            </div>
        </div>
    )
}