import { useState } from "react";
import { functions } from "../../functions/functions";
import { useUser } from "../../functions/providersContext";
import { TeamList } from "../dashboard-components/teamList";
import "../../styles/dashboard.css";
import { TaskDisplay } from "../dashboard-components/taskDisplay";
import { TaskModal } from "../dashboard-components/taskModal";
import { defaultNewTask } from "../../functions/defaultStates";

export const Dashboard = () => {
  const { user, allData, setPage, logOutUser } = useUser();
  const { teams, teamMemberLinks, users, tasks, usersTasks } = allData;
  const userTeamProfiles = functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  );

  const [hasActiveTask, setHasActiveTask] = useState(false)
  const [activeTask, setActiveTask] = useState({...defaultNewTask, id: 0})

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
        <div className="user-info">
          <span>{user.username}</span>
          <input className='logout-user-btn' type='button' value='Log Out' onClick={() => logOutUser() } />
        </div>
        <div className="action-btns">
          <input
            type="button"
            value="Add Task"
            className="action-btn"
            onClick={() => setPage("add-task")}
          />
          <input 
            type="button" 
            value="Join Team / Create Team" 
            className="action-btn" 
            onClick={() => setPage('join-team/create-team')}
          />
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
          <TaskDisplay toDo={toDo} doing={doing} done={done} setHasActiveTask={setHasActiveTask} setActiveTask={setActiveTask}/>
        </div>
      </div>
      {hasActiveTask && <TaskModal  task={activeTask} setHasActiveTask={setHasActiveTask} setActiveTask={setActiveTask}/>}
    </div>
  );
};
