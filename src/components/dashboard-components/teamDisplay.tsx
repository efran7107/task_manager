import {useUser} from "../../functions/providersContext.ts";
import {useState} from "react";


export const TeamDisplay = () => {
    const {activeTeam, userTeams, setActiveTeam} = useUser()
    const teamLeader = activeTeam.getTeamLeader()
    const users = activeTeam.getUsers()
    const [isActive, setIsActive] = useState(false)
    return(
        <div className='team-display-cont'>
            <div className="team-selector-cont">
                <h3 onClick={() => !isActive ? setIsActive(true) : setIsActive(false)} className='team-name-cont'>{activeTeam.getName()}</h3>
                <div className={`team-selection${isActive ? ' active' : ''}`}>
                    {userTeams.map(team => (
                        <p
                            onClick={() => setActiveTeam(team)}
                            key={team.getId()}>{team.getName()}</p>
                    ))}
                </div>
            </div>
            <div className="team-users">
                <h4>Members: </h4>
                <p><i className="fa-solid fa-star"></i> {teamLeader.getUserNames().username}</p>
                {users.map(user => user.getId() !== teamLeader.getId() && (
                    <p key={user.getId()}>{user.getUserNames().username}</p>
                ))}
            </div>
        </div>
    )
}