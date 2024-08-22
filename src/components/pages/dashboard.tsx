import { useState } from "react";
import { functions } from "../../functions/functions";
import { useUser } from "../../functions/providersContext";
import { TeamList } from "../dashboard-components/teamList";
import "../../styles/dashboard.css";
import { TaskDisplay } from "../dashboard-components/taskDisplay";

export const Dashboard = () => {
  const { user, allData } = useUser();
  const { teams, teamMemberLinks, users, tasks, usersTasks } = allData;
  const userTeamProfiles = functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  );

  const [activeTeam, setActiveTeam] = useState(userTeamProfiles[0]);
  const userAssignedTasks = functions.getUserTasks(
    user.id,
    activeTeam.team.id,
    tasks,
    usersTasks
  );
  const toDo = userAssignedTasks.filter((task) => task.status === "to-do");
  const doing = userAssignedTasks.filter((task) => task.status === "doing");
  const done = userAssignedTasks.filter((task) => task.status === "done");

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
        <hr />
        <div className="task-container">
          <TaskDisplay toDo={toDo} doing={doing} done={done} />
        </div>
      </div>
    </div>
  );
};
