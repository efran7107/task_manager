import { useUser } from "../functions/providersContext";
import { Loading } from "./pages/loading";
import { LogInSignUp } from "./pages/logIn_signUp";
import { LogInProvider } from "./providers/logInProvider";
import "../App.css";
import { ErrorPage } from "./pages/errorPage";
import { Dashboard } from "./pages/dashboard";
import { AddTask } from "./pages/addTask";

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
    </div>
  );
};
