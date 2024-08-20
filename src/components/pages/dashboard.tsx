import { useState } from "react";
import { functions } from "../../functions/functions";
import { useUser } from "../../functions/providersContext";
import { TeamList } from "../dashboard-components/teamList";
import "../../styles/dashboard.css";

export const Dashboard = () => {
  const { user, allData } = useUser();
  const { teams, teamMemberLinks, users } = allData;
  const userTeamProfiles = functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  );

  const [activeTeam, setActiveTeam] = useState(userTeamProfiles[0]);

  return (
    <div className="dashboard-container">
      <div className="action-container">
        <span>{user.username}</span>
        <div className="action-btns">
          <input type="button" value="Add Task" className="action-btn" />
          <input type="button" value="Join Team" className="action-btn" />
          <input type="button" value="Create Team" className="action-btn" />
        </div>
      </div>
      <hr />
      <div className="team-task-dashboard">
        <TeamList
          teamProfiles={userTeamProfiles}
          activeTeam={activeTeam}
          setActiveTeam={setActiveTeam}
        />
        {/* create component for user teams */}
        {/* <div className="team-container">
          <h3 className="team-name"></h3>
          <div className="team-member-container"></div>
        </div> */}
        <div className="spacer"></div>
        <div className="task-container">
          {/* create component for task board */}
        </div>
      </div>
    </div>
  );
};
