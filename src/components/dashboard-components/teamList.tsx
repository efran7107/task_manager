import { useState } from "react";
import "../../styles/dashboard.css";
import { useUser } from "../../functions/providersContext";

export const TeamList = () => {

  const {activeTeam, setActiveTeam, userTeamProfiles} = useUser()

  const nonActiveTeams = userTeamProfiles.filter(
    (profile) => profile.team.id !== activeTeam.team.id
  );
  const [isHover, setIsHover] = useState(false);

  const { team, teamMembers } = activeTeam;

  return (
    <div className="team-container">
      <div
        className="team-selection"
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
      >
        <button className="team-select">{team.teamName}</button>
        <div className={`non-active-teams ${isHover ? "visual" : ""}`}>
          {nonActiveTeams.map((profile) => (
            <a
              key={profile.team.id}
              className="team"
              onClick={(e) => {
                e.preventDefault();
                setActiveTeam(profile);
              }}
            >
              {profile.team.teamName}
            </a>
          ))}
        </div>
      </div>
      <div className="team-users">
        <h3>Team Members</h3>
        <div className="users">
          {teamMembers.map((user) => {
            if (user.id === team.teamLeadId) {
              return (
                <p key={user.id}>
                  {user.firstName} {user.lastName}{" "}
                  <i className="fa-solid fa-crown"></i>
                </p>
              );
            }
            return (
              <p key={user.id}>
                {user.firstName} {user.lastName}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};
