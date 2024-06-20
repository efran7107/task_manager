/* eslint-disable react-refresh/only-export-components */
import { GetRequests, PostRequests, PutRequest } from "@/api/api";
import { defaultData } from "@/functions/DefaultStates";
import { apiFunctions } from "@/functions/apiFunctions";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import {
  AllData,
  LogInStatus,
  Note,
  TagInputButton,
  Task,
  TeamMember,
} from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type TUserProvider = {
  user: TeamMember;
  isLoggedIn: LogInStatus;
  setIsLoggedIn: (status: LogInStatus) => void;
  allData: AllData;
  fetchAllData: (logInState: LogInStatus) => void
  isLoading: boolean;
  createUser: (user: Omit<TeamMember, "id">, password: string) => void;
  userAuth: (username: string, password: string) => void;
  isActiveTask: boolean;
  setIsActiveTask: (active: boolean) => void;
  activeTask: Task;
  setActiveTask: (task: Task) => void;
  closeActiveTask: () => void;
  updateTags: (
    tagInput: string,
    taskId: number,
    status: TagInputButton
  ) => void;
  isEditTask: boolean;
  setIsEditTask: (isEdit: boolean) => void;
  updateNotes: (note: Omit<Note, "id">) => void;
  deleteTask: () => void;
  editTask: (task: Task, taskId: number) => void;
};

const UserContext = createContext<TUserProvider>({} as TUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TeamMember>(
    defaultData.getDefaultTeamMember()
  );
  const [allData, setAllData] = useState<AllData>(
    defaultData.getDefaultAllData()
  );
  const [isLoggedIn, setIsLoggedIn] = useState<LogInStatus>("undefined");
  const [isLoading, setIsLoading] = useState(false);
  const [isActiveTask, setIsActiveTask] = useState(false);
  const [activeTask, setActiveTask] = useState<Task>(
    defaultData.getDefaultTask()
  );
  const [isEditTask, setIsEditTask] = useState(false);

  const fetchAllData = (logInState: LogInStatus) => {
    setIsLoading(true);
    setIsLoggedIn("undefined");
    functions
      .getAllData()
      .then((data) => {
        setAllData(data);
        setIsLoading(false);
        setIsLoggedIn(logInState);
      })
      .catch(() => toast.error("error loading data"));
  };

  const userAuth = (username: string, password: string) => {
    switch (validations.isUserExist(username, password, allData)) {
      case true:
        apiFunctions.authUser(username, password, setUser, setIsLoggedIn, allData)
        break;
      default:
        return;
    }
  };

  const createUser = (teamMember: Omit<TeamMember, "id">, password: string) => {
    apiFunctions.createUser(teamMember, password, setUser, setIsLoggedIn, allData, setAllData, fetchAllData)
  };

  const editTask = (task: Task, taskId: number) => {
    PutRequest.updateTask(task).then((res) => {
      if (!res.ok) {
        toast.error("Error updating task");
        setAllData(allData);
        setActiveTask(allData.tasks.find((task) => task.id === taskId)!);
        setIsEditTask(false);
        return;
      }
      functions.getAllData().then((data) => {
        setAllData(data);
        setActiveTask(data.tasks.find((task) => task.id === taskId)!);
        setIsEditTask(false);
      });
    });
  };

  const deleteTask = () => {
    setIsLoading(true);
    const taskAssinments = allData.taskAssignments.filter(
      (ass) => ass.taskId === activeTask.id
    );
    const taskNotes = allData.notes.filter(
      (note) => note.taskId === activeTask.id
    );
    const taskTagLinks = allData.taskTags.filter(
      (link) => link.taskId === activeTask.id
    );
    apiFunctions.deleteTask(taskAssinments, taskNotes, taskTagLinks, allData, setAllData, activeTask)
    setIsLoading(false);
  };

  const closeActiveTask = () => {
    setActiveTask(defaultData.getDefaultTask());
    setIsActiveTask(false);
  };

  const updateTags = (
    tagInput: string,
    taskId: number,
    status: TagInputButton
  ) => {
    switch (status) {
      case "add":
        apiFunctions.addTag(tagInput, taskId, allData, setAllData);
        break;
      case "delete":
        apiFunctions.deleteTag(tagInput, taskId, allData, setAllData);
        break;
    }
  };

  const updateNotes = (note: Omit<Note, "id">) => {
    PostRequests.postNewNote(note).then((res) => {
      if (!res.ok) {
        setAllData(allData);
        toast.error("error adding note");
      }
      functions.getAllData().then((data) => {
        setAllData(data);
        toast.success("added note successully");
      });
    });
  };

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const userName = localStorage.getItem("user");
      GetRequests.getUserByUsername(userName!).then((users) => {
        const user = users[0];
        setUser(user);
        functions.getHeaderContainer();
      });
      fetchAllData("dashboard");
    } else {
      fetchAllData("not logged in");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        setIsLoggedIn,
        allData,
        fetchAllData,
        isLoading,
        createUser,
        userAuth,
        isActiveTask,
        setIsActiveTask,
        activeTask,
        setActiveTask,
        closeActiveTask,
        updateTags,
        isEditTask,
        setIsEditTask,
        updateNotes,
        deleteTask,
        editTask,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
