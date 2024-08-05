import { useUser } from "../functions/providersContext";
import { Loading } from "./pages/loading";
import { LogInSignUp } from "./pages/logIn_signUp";
import { LogInProvider } from "./providers/logInProvider";
import "../App.css";
import { ErrorPage } from "./pages/errorPage";

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
    </div>
  );
};
