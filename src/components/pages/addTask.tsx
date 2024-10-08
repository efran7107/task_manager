import { useState } from "react";
import {
  AddUsers,
  ExistingTagInput,
  UserDateInput,
  UserInput,
  UserNoteInput,
  UserStatusInput,
  UserTextareaInput,
} from "../inputs/formInputs";
import { defaultNewTask } from "../../functions/defaultStates";
import { useUser } from "../../functions/providersContext";
import { Note, Tag, User } from "../../types/objectTypes";
import "../../styles/add-tasks.css";
import { validations } from "../../functions/validations";
import toast from "react-hot-toast";
import { apiFunctions } from "../../functions/apiFunctions";

export const AddTask = () => {
  const todaysDate = new Date();
  const {
    user,
    allData,
    setPage,
    reloadData,
    userTeamProfiles,
    activeTeam,
    setActiveTeam,
  } = useUser();
  const { tags } = allData;
  const [newTask, setNewTask] = useState({
    ...defaultNewTask,
    ucId: user.id,
    dateCreated: todaysDate.toLocaleDateString(),
  });
  const { title, desc, isUrgent } = newTask;

  const [newNote, setNewNote] = useState<Omit<Note, "id">>({
    title: "",
    desc: "",
    dateCreated: todaysDate.toLocaleDateString(),
    taskId: 0,
    authId: user.id,
  });
  const [newTagSet, setNewTagSet] = useState<Array<Omit<Tag, "id"> | Tag>>([]);
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const { team, teamMembers } = activeTeam;
  return (
    <div className="add-task-cont">
      <h2 className="add-task">
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => setPage("dashboard")}
        ></i>{" "}
        Add Task
      </h2>
      <div className="task-team-selection">
        <button className="team-select">{team.teamName}</button>
        <div className="options">
          {userTeamProfiles
            .filter((set) => set.team.id !== team.id)
            .map((set) => (
              <a key={set.team.id} onClick={() => setActiveTeam(set)}>
                {set.team.teamName}
              </a>
            ))}
        </div>
      </div>
      <form
        className="add-task-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validations.isValidTask(newTask)) {
            toast.error(
              "Please fill out the task title, description, and due date"
            );
            return;
          }
          setPage("loading");
          apiFunctions
            .addTask(
              user.id,
              newTask,
              team.id,
              newNote,
              newTagSet,
              assignedUsers,
              setPage
            )
            .then(() => {
              reloadData();
            });
        }}
      >
        <UserInput
          label="Task Name"
          name="taskName"
          userInputProps={{
            type: "text",
            value: `${title}`,
            onChange: (e) => {
              setNewTask({ ...newTask, title: e.currentTarget.value });
            },
          }}
        />
        <UserTextareaInput
          label="Description"
          name="desc"
          userTextareaInput={{
            value: `${desc}`,
            onChange: (e) => {
              setNewTask({ ...newTask, desc: e.currentTarget.value });
            },
            placeholder: "enter the task description here",
          }}
        />
        <UserStatusInput
          propInputs={{ newTask: newTask, setNewTask: setNewTask }}
        />
        <UserDateInput
          propInputs={{ newTask: newTask, setNewTask: setNewTask }}
        />
        <div className="urgent-cont">
          <label className="urgent-label">Urgent:</label>
          <input
            type="checkbox"
            name="isUrgent"
            id="isUrgent"
            defaultChecked={isUrgent}
            onClick={() =>
              setNewTask({ ...newTask, isUrgent: isUrgent ? false : true })
            }
          />
        </div>
        <UserNoteInput note={newNote} setNote={setNewNote} />
        <ExistingTagInput
          newTagSet={newTagSet}
          setNewTagSet={setNewTagSet}
          tags={tags}
        />
        <AddUsers
          users={teamMembers}
          userId={user.id}
          team={team}
          assignedUsers={assignedUsers}
          setAssignedUsers={setAssignedUsers}
        />
        <input type="submit" value="Submit Task" className="submit-task-btn" />
      </form>
    </div>
  );
};
