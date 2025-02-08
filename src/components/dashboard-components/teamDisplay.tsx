import {useUser} from "../../functions/providersContext.ts";
import {useState} from "react";


export const TeamDisplay = () => {
    const {activeTeam, userTeams, setActiveTeam} = useUser()
    const {team, users} = activeTeam
    const [isActive, setIsActive] = useState(false)
    const teamLeader = users.find((user) => user.id === team.teamLeadId)!
    return(
        <div className='team-display-cont'>
            <div className="team-selector-cont">
                <h3 onClick={() => !isActive ? setIsActive(true) : setIsActive(false)} className='team-name-cont'>{team.name}</h3>
                <div className={`team-selection${isActive ? ' active' : ''}`}>
                    {userTeams.map(team => (
                        <p
                            onClick={() => setActiveTeam(team)}
                            key={team.team.id}>{team.team.name}</p>
                    ))}
                </div>
            </div>
            <div className="team-users">
                <p><i className="fa-solid fa-star"></i> {teamLeader.username}</p>
                {users.map(user => user.id !== teamLeader.id && (
                    <p key={user.id}>{user.username}</p>
                ))}
            </div>
        </div>
    )
}