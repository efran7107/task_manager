import { useState } from "react";
import { functions } from "../../functions/functions";
import { useUser } from "../../functions/providersContext";
import { TeamList } from "../dashboard-components/teamList";
import "../../styles/dashboard.css";
import { TaskDisplay } from "../dashboard-components/taskDisplay";
import { TaskModal } from "../dashboard-components/taskModal";

export const Dashboard = () => {
  const { user, allData, setPage, logOutUser, activeTeam } = useUser();
  const { tasks, usersTasks } = allData;

  const [hasActiveTask, setHasActiveTask] = useState(false)
  const [isConfirmLeaving, setIsConfirmLeaving] = useState(false)

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
          <div className="leave-team">
            <input type="button" value="Leave Team" onClick={() => setIsConfirmLeaving(true)}/>
            {isConfirmLeaving && (
              <div className="confirm">
                <p>Are you sure you want to leave the team?</p>
                <div className="yes-no">
                  <input type="button" value="yes" />
                  <input type="button" value="no" onClick={() => setIsConfirmLeaving(false)}/>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr />
      <div className="team-task-dashboard">
        <TeamList/>
        <hr />
        <div className="task-container">
          <TaskDisplay toDo={toDo} doing={doing} done={done} setHasActiveTask={setHasActiveTask} />
        </div>
      </div>
      {hasActiveTask && <TaskModal  setHasActiveTask={setHasActiveTask}/>}
    </div>
  );
};
