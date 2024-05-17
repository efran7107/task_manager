import { TUserTeams } from "@/types/types";
import '@/styles/userTeam.css'

export const UserTeams = ({userTeams}: {userTeams: TUserTeams}) => {    
    return  (
        <div className="user-teams">
            <h2>Teams</h2>
            <div className="team-container">
                {userTeams.map(userTeam => (
                    <div className="users-cont" key={userTeam.team.id}>
                        <h3>{userTeam.team.teamName}</h3>
                        <div className="team-members">
                            {userTeam.users.map(user => (
                                <p key={user.id}>{user.name}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}