/* eslint-disable react-refresh/only-export-components */
import { DeleteRequests, GetRequests, PostRequests } from "@/api/api";
import { defaultData } from "@/functions/DefaultStates";
import { functions } from "@/functions/functions";
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
  allData: AllData;
  isLoading: boolean;
  createUser: (user: Omit<TeamMember, "id">, password: string) => void;
  userAuth: (username: string, password: string) => void;
  isExistingUser: (username: string) => boolean;
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

  const fetchallData = (logInState: LogInStatus) => {
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
    if (username === "" || password === "") {
      toast.error("Please enter a username and/or password");
      return;
    } else if (
      allData!.users.filter((user) => user.username === username && user)
        .length === 0
    ) {
      toast.error("User not found");
      return;
    }
    GetRequests.getUserPassword(
      allData!.users.filter((user) =>
        user.username === username ? user : null
      )[0].id
    ).then((passwordAuth) => {
      if (passwordAuth.password !== password) {
        toast.error("Wrong password");
        return;
      }
      toast.success("Login successful");
      setUser(
        allData!.users.filter((user) =>
          user.username === username ? user : null
        )[0]
      );
      setIsLoggedIn("logged in");
      localStorage.setItem(
        "user",
        allData!.users.filter((user) =>
          user.username === username ? user : null
        )[0].username
      );
      functions.getHeaderContainer();
    });
  };

  const isExistingUser = (username: string): boolean => {
    return (
      allData!.users.filter((user) => user.username === username && user)
        .length > 0
    );
  };

  const createUser = (teamMember: Omit<TeamMember, "id">, password: string) => {
    PostRequests.registerUser(teamMember)
      .then((user) => {
        PostRequests.registerUserAuth({
          teamMemberId: user.id,
          password: password,
        }).then((res) => {
          if (!res.ok) {
            toast.error("Error creating user");
            return;
          }
        });
        setUser(user);
        localStorage.setItem("user", user.username);
        setIsLoggedIn("logged in");
        functions.getHeaderContainer();
      })
      .catch(() => toast.error("Error creating user"));
    fetchallData("logged in");
  };

  const deleteTask = () => {
    const taskCreater = allData.taskCreater.find(
      (creater) =>
        creater.taskId === activeTask.id && creater.teamMemberId === user.id
    );
    const taskAssignments = allData.taskAssignments.filter(
      (task) => task.taskId === activeTask.id
    );
    const taskTaglinks = allData.taskTags.filter(
      (link) => link.taskId === activeTask.id
    );
    const notes = allData.notes.filter((note) => note.taskId === activeTask.id);
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
        switch (functions.doesTagExist(tagInput, allData.tags)) {
          case true:
            PostRequests.postTaskTagLink({
              tagId: allData.tags.find(
                (currentTask) => currentTask.tagName.slice(1) === tagInput
              )!.id,
              taskId: taskId,
            }).then((res) => {
              if (!res.ok) {
                setAllData(allData);
              }
              functions.getAllData().then((data) => {
                setAllData(data);
              });
            });
            break;
          case false:
            PostRequests.postNewTag({ tagName: `#${tagInput}` }).then(
              (newTag) => {
                PostRequests.postTaskTagLink({
                  tagId: newTag.id,
                  taskId: taskId,
                }).then((res) => {
                  if (!res.ok) {
                    setAllData(allData);
                  }
                  functions.getAllData().then((data) => {
                    setAllData(data);
                  });
                });
              }
            );
            break;
          default:
            break;
        }
        break;
      case "delete":
        switch (
          functions.isOnlyOneLink(tagInput, allData.tags, allData.taskTags)
        ) {
          case true:
            DeleteRequests.deleteTaskTagLink(
              allData.taskTags.find((link) => {
                if (
                  link.tagId ===
                    allData.tags.find(
                      (tag) => tag.tagName.slice(1) === tagInput
                    )!.id &&
                  link.taskId === taskId
                ) {
                  return link;
                }
              })!.id
            ).then((res) => {
              if (!res.ok) {
                setAllData(allData);
              }
              DeleteRequests.deleteTag(
                allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!
                  .id
              ).then((res) => {
                if (!res.ok) {
                  setAllData(allData);
                }
                functions.getAllData().then((data) => {
                  setAllData(data);
                });
              });
            });
            break;
          case false:
            DeleteRequests.deleteTaskTagLink(
              allData.taskTags.find((link) => {
                if (
                  link.tagId ===
                    allData.tags.find(
                      (tag) => tag.tagName.slice(1) === tagInput
                    )!.id &&
                  link.taskId === taskId
                ) {
                  return link;
                }
              })!.id
            ).then((res) => {
              if (!res.ok) {
                setAllData(allData);
              }
              functions.getAllData().then((data) => {
                setAllData(data);
              });
            });
            break;
        }
        break;
    }
  };

  const updateNotes = (note: Omit<Note, "id">) => {
    PostRequests.postNewNote(note).then((res) => {
      if (!res.ok) {
        setAllData(allData);
      }
      functions.getAllData().then((data) => {
        setAllData(data);
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
      fetchallData("logged in");
    } else {
      fetchallData("not logged in");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        allData,
        isLoading,
        createUser,
        userAuth,
        isExistingUser,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
