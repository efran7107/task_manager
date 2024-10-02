import { ReactNode, useEffect, useState } from "react";
import { UserProviderContext } from "../../functions/providersContext";
import { AllData, Page, Task, User } from "../../types/objectTypes";
import { validations } from "../../functions/validations";
import { defaultAllData, defaultNewTask, defaultUser } from "../../functions/defaultStates";
import { apiFunctions } from "../../functions/apiFunctions";
import { functions } from "../../functions/functions";
import { PostRequests } from "../../api";
import toast from "react-hot-toast";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState<Page>("loading");
  const [allData, setAllData] = useState<AllData>(defaultAllData());
  const [user, setUser] = useState<User>(defaultUser);
  const {users, teams, teamMemberLinks} = allData
  const [activeTask, setActiveTask] = useState<Task>({...defaultNewTask, id: 0})
  const [userTeamProfiles, setUserTeamProfiles] = useState(functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  )) 
  const [activeTeam, setActiveTeam] = useState(userTeamProfiles[0]);
  
  const reloadData = () => {
    apiFunctions
      .getAllData()
      .then((res) => {
        setAllData(res);
      })
      .catch(() => {
        setPage("error");
      });
  };

  const logOutUser = () => {
    localStorage.removeItem("user");
    document.querySelectorAll(".site-title")[0].classList.remove("logged-in");
    setPage("login/signup")
  } 

  const joinTeam = (teamName: string) => {
    const team = teams.find(team => team.teamName === teamName)!
    const userTeamLink = teamMemberLinks.find(link => link.teamId === team.id && link.userId === user.id)
    if(userTeamLink === undefined){
      PostRequests.createTeamMemberLink({userId: user.id, teamId: team.id})
      .then(() => {
        toast.success(`Congrats you have joined ${team.teamName}`)
        setPage('dashboard')
      })
      .catch(() => {
        toast.error('touble joining team please tye agian later')
        setPage('error')
      })
      reloadData()
      return
    }
    toast.error('user already part of team')
  }

  const createTeam = ( newTeamInput: {newTeamName: string, newTeamCode: string}) => {
    const {newTeamName, newTeamCode} = newTeamInput
    PostRequests.createTeam({
      teamName: newTeamName,
      teamCode: newTeamCode,
      teamLeadId: user.id
    })
      .then((res) => {
        PostRequests.createTeamMemberLink({
          userId: user.id,
          teamId: res.id
        })
        toast.success('Successfully made team')
        reloadData()
        setPage('dashboard')
      })
      .catch(() => {
        toast.error('error adding team')
        setPage('error')
      })
    
  }

  useEffect(() => {
    const isUserLogged = validations.isUserLoggedIn();
    apiFunctions
      .getAllData()
      .then((res) => {
        setAllData(res);
        if (!isUserLogged) {
          setPage("login/signup");
          return;
        }
        const user: User = JSON.parse(localStorage.getItem("user")!);
        functions.logInUser(setUser, user.username, res.users);
        setUserTeamProfiles(functions.getTeamMemberInfo(user, res.teams, res.teamMemberLinks, res.users))
        setActiveTeam(functions.getTeamMemberInfo(user, res.teams, res.teamMemberLinks, res.users)[0])
        document.querySelectorAll(".site-title")[0].classList.add("logged-in");
        setPage("dashboard");
      })
      .catch(() => {
        setPage("error");
      });
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        page,
        setPage,
        allData,
        setAllData,
        user,
        setUser,
        reloadData,
        logOutUser,
        joinTeam,
        createTeam,
        activeTask,
        setActiveTask,
        userTeamProfiles,
        setUserTeamProfiles,
        activeTeam,
        setActiveTeam
      }}
    >
      {children}
    </UserProviderContext.Provider>
  );
};
