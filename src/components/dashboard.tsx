import { useUser } from "./componentsProvider/UserProvider";
import "../styles/dashboard.css";
import { functions } from "@/functions/functions";
import { UserTeams } from "./userTeam";
import { TaskBoard } from "./taskBoard";
import "@/styles/dashboard.css";
import { CreateForm } from "./createTaskForm";

export const UserDashboard = () => {
  const { user, allData, isLoggedIn, setIsLoggedIn } = useUser();

  const {
    teams,
    users,
    userTeamLinks,
    tasks,
    taskAssignments,
    tags,
    taskTags,
  } = allData;
  const userTeams = functions.getTeamMembers(
    teams,
    users,
    userTeamLinks,
    user.id
  );
  const userTasks = functions.sortTasks(
    functions.getUserTasks(tasks, taskAssignments, user.id)
  );

  return (
    <div className="container">
      <div className="dashboard-header-container">
        <h3>{user.username}</h3>
        {isLoggedIn !== "create task" && (
          <a
            className="link-btn add-task"
            onClick={() => {
              setIsLoggedIn("create task");
            }}
          >
            {" "}
            + addTask
          </a>
        )}
      </div>
      {isLoggedIn === "logged in" && (
        <div className="user-dashboard">
          <UserTeams userTeams={userTeams} />
          <TaskBoard tasks={userTasks} tags={tags} taskTags={taskTags} />
        </div>
      )}
      {isLoggedIn === "create task" && <CreateForm />}
    </div>
  );
};
