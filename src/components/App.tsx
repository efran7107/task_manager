import { useEffect, useState } from "react";
import "../css/App.css";
import { ThemeProvider } from "./providers/themeProvider";
import { ThemeButton } from "./inputs/theme-btn";
import { LogInProvider } from "./providers/logInProvider";
import { UserLogIn } from "./userLogIn";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./providers/userProvider";
import { Dashboard } from "./dashboard";
import { TPage } from "../types/globalTypes";
import { LoadingPage } from "./loadingPage";
import { checkUserTeam } from "../functions/apiFunctions";
import { TeamEntry } from "./teamEntry";

function App() {
  const [page, setPage] = useState<TPage>("loading");

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      setPage("log-in");
    } else {
      checkUserTeam(user).then(setPage);
    }
  }, []);

  return (
    <>
      <Toaster />
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeButton />
        <div className={`head-title ${page !== "log-in" ? "logged-in" : ""}`}>
          <h1 onClick={() => {
            if(page !== "log-in") {
              setPage('home-page')
              return
            }
            }}>Task Manager</h1>
        </div>
        <div className="container">
          {page === "loading" && <LoadingPage />}
          {page === "log-in" && (
            <LogInProvider setPage={setPage}>
              <UserLogIn />
            </LogInProvider>
          )}
          {page === "home-page" && (
            <UserProvider setPage={setPage}>
              <Dashboard />
            </UserProvider>
          )}
          {page === "create/join-team" && <TeamEntry setPage={setPage} />}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
