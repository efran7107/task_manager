import { useEffect, useState } from "react";
import "../css/App.css";
import { ThemeProvider } from "./providers/themeProvider";
import { ThemeButton } from "./inputs/theme-btn";
import { LogInProvider } from "./providers/logInProvider";
import { UserLogIn } from "./userLogIn";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./providers/userProvider";
import { Dashboard } from "./dashboard";
import { LoadingPage } from "./loadingPage";
import { checkUserTeam } from "../functions/apiFunctions";
import { TeamEntry } from "./teamEntry";
import {CreateTask} from "./createTask.tsx";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {TPage} from "../types/globalTypes.ts";

function App() {
  const navigate = useNavigate()
  const  [isInLogIn, setIsInLogIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const setPage = (page: TPage) => {
    setIsLoading(true)
    if(page === 'log-in') setIsInLogIn(false)
    else setIsInLogIn(true)
    setIsLoading(false)
    navigate(`/${page}`)
  }

  useEffect(() => {
    const user = localStorage.getItem("username");
    setIsLoading(true)
    if (!user) {
      setIsLoading(false)
      navigate('/log-in')
      setIsInLogIn(false)
      return
    }
      setIsLoading(false)
      checkUserTeam(user).then((hasTeam) => {
        if(hasTeam) {
          navigate('/home-page')
          setIsInLogIn(true)
          return
        }
        setIsInLogIn(true)
        navigate('/create_join-team')
      });

  }, []);

  return (
    <>
      <Toaster />
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeButton />
        <div className={`head-title ${isInLogIn ? "logged-in" : ""}`}>
          <h1 onClick={() => {
            if(isInLogIn) {
              navigate('/home-page')
              return
            }
            }}>Task Manager</h1>
        </div>
        <div className="container">
          {isLoading && (<LoadingPage />)}
          <Routes>
            <Route path='/' element={<Navigate to={!isInLogIn ? '/home-page' : '/log-in'}/>}/>
            <Route path='/log-in' element={
              <LogInProvider setPage={setPage} setIsLoading={setIsLoading}>
                <UserLogIn />
              </LogInProvider>}
            />

            <Route path='/home-page' element={
              <UserProvider setPage={setPage}>
                <Dashboard />
              </UserProvider>
            }/>
            <Route path='/create_join-team' element={<TeamEntry setPage={setPage} />}/>
            <Route path='/create-task' element={<CreateTask/>}/>


          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
