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

  return (
    <div className="team-container">
      <div className="team-selection">
        <button className="team-select">{activeTeam.team.teamName}</button>
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
    </div>
  );
};
