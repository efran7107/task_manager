import { useState } from "react";
import { useUser } from "../../functions/providersContext";
import "../../styles/add-tasks.css";
import {
  AddUsers,
  ExistingTagInput,
  UserDateInput,
  UserInput,
  UserNoteInput,
  UserStatusInput,
  UserTextareaInput,
} from "../inputs/formInputs";
import { Note, Tag, User } from "../../types/objectTypes";
import { validations } from "../../functions/validations";
import toast from "react-hot-toast";
import { functions } from "../../functions/functions";

export const EditTask = () => {
  const {
    user,
    activeTask,
    setPage,
    activeTeam,
    allData,
    setAllData,
    reloadData,
  } = useUser();
  const { tags, usersTasks, taggedTasks } = allData;
  const { id, ...taskNoId } = activeTask;
  const { team, teamMembers } = activeTeam;
  const taskUsers = usersTasks.filter((userTask) => userTask.taskId === id);
  const currentAssignedUsers = taskUsers.map(
    (userTask) => teamMembers.find((member) => member.id === userTask.userId)!
  );
  const taskTags = taggedTasks.filter((taggedTask) => taggedTask.taskId === id);
  const existingTags = taskTags.map(
    (taggedTask) => tags.find((tag) => tag.id === taggedTask.tagId)!
  );
  const todaysDate = new Date();

  const [task, setTask] = useState(taskNoId);
  const { title, desc, isUrgent } = task;
  const [newTagSet, setNewTagSet] =
    useState<Array<Omit<Tag, "id"> | Tag>>(existingTags);
  const [newNote, setNewNote] = useState<Omit<Note, "id">>({
    title: "",
    desc: "",
    dateCreated: todaysDate.toLocaleDateString(),
    taskId: 0,
    authId: user.id,
  });
  const [assignedUsers, setAssignedUsers] =
    useState<User[]>(currentAssignedUsers);

  return (
    <div className="edit-task-cont">
      <h2 className="edit-task">
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => setPage("dashboard")}
        ></i>{" "}
        Edit Task
      </h2>
      <form
        className="edit-task-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!validations.isValidTask(task)) {
            toast.error(
              "Please fill out the task title, description, and due date"
            );
            return;
          }
          setPage("loading");
          functions.editTask(
            activeTeam,
            { ...task, id: id },
            currentAssignedUsers,
            assignedUsers,
            newTagSet,
            newNote,
            allData,
            setAllData,
            setPage,
            reloadData
          );
        }}
      >
        <UserInput
          label="Task Name"
          name="taskName"
          userInputProps={{
            type: "text",
            value: title,
            onChange: (e) => {
              setTask({ ...task, title: e.currentTarget.value });
            },
          }}
        />
        <UserTextareaInput
          label="Description"
          name="desc"
          userTextareaInput={{
            value: desc,
            onChange: (e) => {
              setTask({ ...task, desc: e.currentTarget.value });
            },
          }}
        />
        <UserStatusInput propInputs={{ newTask: task, setNewTask: setTask }} />
        <UserDateInput propInputs={{ newTask: task, setNewTask: setTask }} />
        <div className="urgent-cont">
          <label className="urgent-label">Urgent:</label>
          <input
            type="checkbox"
            name="isUrgent"
            id="isUrgent"
            defaultChecked={isUrgent}
            onClick={() =>
              setTask({ ...task, isUrgent: isUrgent ? false : true })
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
        <input type="submit" value="Save Edit" className="submit-task-btn" />
      </form>
    </div>
  );
};
