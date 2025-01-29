import { useEffect, useState } from "react";
import "../css/App.css";
import { ThemeProvider } from "./providers/themeProvider";
import { ThemeButton } from "./inputs/theme-btn";
import { LogInProvider } from "./providers/logInProvider";
import { UserLogIn } from "./userLogIn";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) setIsLoggedIn(false);
    else setIsLoggedIn(true);
  }, []);

  return (
    <>
    <Toaster/>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeButton />
      </ThemeProvider>
      <h1 className={`head-title ${isLoggedIn ? "logged-in" : ""}`}>
        Task Manager
      </h1>
      {!isLoggedIn && (
        <LogInProvider>
          <UserLogIn setIsLoggedIn={setIsLoggedIn}/>
        </LogInProvider>
      )}
    </>
  );
}

export default App;
