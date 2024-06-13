import { AllData, LogInStatus, Note, Task, TaskAssinmentLink, TaskTagLink, TeamMember } from "@/types/types";
import { functions } from "./functions";
import { DeleteRequests, GetRequests, PostRequests } from "@/api/api";
import toast from "react-hot-toast";


const createUser = (
  teamMember: Omit<TeamMember, 'id'>, 
  password: string,
  setUser: (user: TeamMember) => void,
  setIsLoggedIn: (status: LogInStatus) => void,
  allData: AllData,
  setAllData: (data: AllData) => void,
  fetchallData: (status: LogInStatus) => void,
) => {
  PostRequests.registerUser(teamMember)
    .then((user) => {
      PostRequests.registerUserAuth({
        teamMemberId: user.id,
        password: password
      })
      toast.success('user created')
      setUser(user)
      setIsLoggedIn('logged in')
      localStorage.setItem("user", user.username)
      functions.getHeaderContainer();
      fetchallData('logged in');
    }).catch(() => {
      setAllData(allData)
      fetchallData('not logged in')
      toast.error('Failed to create user')
    })
}

const authUser = (
  username: string,
  password: string,
  setUser: (user: TeamMember) => void,
  setIsLoggedIn: (status: LogInStatus) => void,
  allData: AllData,
) => {
  GetRequests.getUserPassword(
    allData.users.filter((user => 
      user.username === username ? user : null
    ))[0].id
  ).then((passwordAuth) => {
    if(passwordAuth.password !== password){
      toast.error('Incorrect password')
      return;
    }
    toast.success('Login successfull')
    setUser(allData.users.filter((user => user.username === username))[0])
    setIsLoggedIn('logged in')
    localStorage.setItem("user", username)
  })
  functions.getHeaderContainer();
}

const deleteTask = (
  taskAssinments: TaskAssinmentLink[], 
  taskNotes: Note[], 
  taskTagLinks: TaskTagLink[], 
  allData: AllData,
  setAllData: (allData: AllData) => void,
  activeTask: Task
) => {
  taskAssinments.forEach((ass) => {
    functions.deleteTaskAssignment(ass.id);
  });
  taskTagLinks.forEach((link) => {
    const tag = allData.tags.find((tag) => tag.id === link.tagId)!;
    if (
      allData.taskTags.filter((link) => link.tagId === tag.id).length <= 1
    ) {
      functions.deleteTag(tag.id);
    }
  });
  taskNotes.forEach((note) => {
    functions.deleteNote(note.id);
  });
  functions.deleteTask(activeTask.id);
  functions
      .getAllData()
      .then((data) => {
        setAllData(data);
      })
      .catch(() => {
        setAllData(allData);
      });
}

const addTag = (
  tagInput: string,
  taskId: number,
  allData: AllData,
  setAllData: (data: AllData) => void
) => {
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
          toast.error("error adding tag");
        }
        functions.getAllData().then((data) => {
          setAllData(data);
          toast.success("sucessfully added tag");
        });
      });
      break;
    case false:
      PostRequests.postNewTag({ tagName: `#${tagInput}` }).then((newTag) => {
        PostRequests.postTaskTagLink({
          tagId: newTag.id,
          taskId: taskId,
        }).then((res) => {
          if (!res.ok) {
            setAllData(allData);
            toast.error("error adding tag");
          }
          functions.getAllData().then((data) => {
            setAllData(data);
            toast.success("sucessfully added tag");
          });
        });
      });
      break;
    default:
      break;
  }
};

const deleteTag = (
  tagInput: string,
  taskId: number,
  allData: AllData,
  setAllData: (data: AllData) => void
) => {
  switch (functions.isOnlyOneLink(tagInput, allData.tags, allData.taskTags)) {
    case true:
      DeleteRequests.deleteTaskTagLink(
        allData.taskTags.find((link) => {
          if (
            link.tagId ===
              allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!
                .id &&
            link.taskId === taskId
          ) {
            return link;
          }
        })!.id
      ).then((res) => {
        if (!res.ok) {
          setAllData(allData);
          toast.error("error deleting tag");
        }
        DeleteRequests.deleteTag(
          allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!.id
        ).then((res) => {
          if (!res.ok) {
            setAllData(allData);
            toast.error("error deleting tag");
          }
          functions.getAllData().then((data) => {
            setAllData(data);
            toast.success("sucessfully deleted tag");
          });
        });
      });
      break;
    case false:
      DeleteRequests.deleteTaskTagLink(
        allData.taskTags.find((link) => {
          if (
            link.tagId ===
              allData.tags.find((tag) => tag.tagName.slice(1) === tagInput)!
                .id &&
            link.taskId === taskId
          ) {
            return link;
          }
        })!.id
      ).then((res) => {
        if (!res.ok) {
          setAllData(allData);
          toast.error("error deleting tag");
        }
        functions.getAllData().then((data) => {
          setAllData(data);
          toast.success("sucessfully deleted tag");
        });
      });
      break;
  }
};


export const apiFunctions = {
  createUser,
  authUser,
  deleteTask,
  addTag,
  deleteTag,
};
