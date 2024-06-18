import { TUserTeams } from "@/types/types";
import "@/styles/userTeam.css";
import { transformations } from "@/functions/transformations";
import { useUser } from "./componentsProvider/UserProvider";

export const UserTeams = ({ userTeams }: { userTeams: TUserTeams }) => {
  const { user } = useUser();

  return (
    <div className="user-teams">
      <h2>Teams</h2>
      <div className="team-container">
        {userTeams.map((userTeam) => (
          <div className="users-cont" key={userTeam.team.id}>
            <h3>{userTeam.team.teamName}</h3>
            <div className="team-members">
              {transformations
                .moveToFront(userTeam.team.teamLeaderId, userTeam.users)
                .map((userInTeam) => (
                  <div
                    key={userInTeam.id}
                    className={`name-container ${
                      userInTeam.id === user.id ? "active-user" : ""
                    }`}
                  >
                    <i
                      className={`fa-solid fa-users-line ${
                        userInTeam.id !== userTeam.team.teamLeaderId &&
                        "team-member"
                      }`}
                    ></i>
                    <p key={userInTeam.id}>{userInTeam.name}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
