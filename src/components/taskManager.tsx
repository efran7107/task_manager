import { useUser } from "../functions/providersContext";
import { Loading } from "./pages/loading";
import { LogInSignUp } from "./pages/logIn_signUp";
import { LogInProvider } from "./providers/logInProvider";
import "../App.css";
import { ErrorPage } from "./pages/errorPage";
import { Dashboard } from "./pages/dashboard";
import { AddTask } from "./pages/addTask";
import { UserJoinTeam } from "./pages/user-team-join";
import { EditTask } from "./pages/edit-task";
import { TaskNotePage } from "./pages/task-note-page";
import { AddNote } from "./dashboard-components/note-display";

export const TaskManager = () => {
  const { page } = useUser();
  return (
    <div className="container">
      {page === "error" && <ErrorPage />}
      {page === "loading" && <Loading />}
      {page === "login/signup" && (
        <LogInProvider>
          <LogInSignUp />
        </LogInProvider>
      )}
      {page === "dashboard" && <Dashboard />}
      {page === "add-task" && <AddTask />}
      {page === "join-team/create-team" && <UserJoinTeam />}
      {page === "edit task" && <EditTask />}
      {page === "task-notes" && <TaskNotePage />}
      {page === "add-note" && <AddNote />}
    </div>
  );
};
