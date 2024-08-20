import { TeamProfile } from "../../types/objectTypes";

export const TeamList = ({
  teamProfiles,
  activeTeam,
  setActiveTeam,
}: {
  teamProfiles: Array<TeamProfile>;
  activeTeam: TeamProfile;
  setActiveTeam: (team: TeamProfile) => void;
}) => {
  const nonActiveTeams = teamProfiles.filter(
    (profile) => profile.team.id !== activeTeam.team.id
  );

  const { team, teamMembers } = activeTeam;

  return (
    <div className="team-container">
      <div className="team-selection">
        <button className="team-select">{team.teamName}</button>
        <div className="non-active-teams">
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
                  <i className="fa-solid fa-crown"></i> {user.firstName}{" "}
                  {user.lastName}
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
