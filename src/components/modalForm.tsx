import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import { Note, Task } from "@/types/types";
import "@/styles/modalForm.css";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import { defaultData } from "@/functions/DefaultStates";
import toast from "react-hot-toast";
import { UserInput, UserTextArea } from "./taskModalComponentForm/UserInput";
import { DateInputs } from "./taskModalComponentForm/dateInput";
import { StatusInputs } from "./taskModalComponentForm/StatusInput";

export const TaskModalForm = ({
  task,
  pastDue,
}: {
  task: Task;
  pastDue: boolean;
}) => {
  const {
    closeActiveTask,
    allData,
    user,
    updateTags,
    setIsEditTask,
    updateNotes,
    deleteTask,
    editTask,
  } = useUser();
  const { tags, taskTags } = allData;
  const [userTask, setUserTask] = useState<Task>(task);
  const [tagInput, setTagInput] = useState("");
  const tagList = functions.getTaskTags(tags, taskTags, userTask.id);
  const [note, setNote] = useState<Omit<Note, "id">>(
    defaultData.getDefaultNote
  );

  return (
    <form
      className={`modal-container active ${pastDue ? "past-duedate" : ""} edit`}
      onSubmit={(e) => e.preventDefault()}
    >
      <i
        className="fa-solid fa-xmark"
        onClick={() => {
          setIsEditTask(false);
          closeActiveTask();
        }}
      ></i>
      <i
        className={
          userTask.isImportant
            ? "fa-solid fa-triangle-exclamation important"
            : "fa-solid fa-triangle-exclamation"
        }
      ></i>
      <i
        className="fa-solid fa-cloud-arrow-up"
        onClick={() => {
          if (
            validations.isNotBlank(userTask.taskName) ||
            validations.isNotBlank(userTask.description)
          ) {
            setUserTask({
              ...userTask,
              taskName: task.taskName,
              description: task.description,
            });
            toast.error(
              "Please fill in both task name and description to save changes."
            );
            return;
          }
          editTask(userTask, userTask.id);
        }}
      ></i>
      <a
        className="cancel-form"
        onClick={() => {
          setIsEditTask(false);
        }}
      >
        Cancel
      </a>
      <i
        className="fa-solid fa-trash"
        onClick={() => {
          deleteTask();
        }}
      ></i>
      <UserInput
        id="taskName"
        label="Task Name"
        className="task-name-input"
        userProps={{
          id: "taskName",
          type: "text",
          name: "taskName",
          autoComplete: "off",
          value: userTask.taskName,
          onChange: (e) => {
            setUserTask({ ...userTask, taskName: e.target.value });
          },
        }}
      />
      <UserTextArea
        id="taskDescription"
        label="Task"
        className="task-description-input"
        userProps={{
          value: userTask.description,
          onChange: (e) => {
            setUserTask({ ...userTask, description: e.target.value });
          },
        }}
      />
      <DateInputs
        id="dueDate"
        label="Due Date"
        className="date-input"
        userTask={userTask}
        setUserTask={setUserTask}
      />
      <StatusInputs
        id="status"
        label="Status"
        className="status-update"
        userTask={userTask}
        setUserTask={setUserTask}
      />
      <div className="important-input">
        <label htmlFor="important">Important: </label>
        <input
          type="checkbox"
          name="important"
          id="important"
          defaultChecked={userTask.isImportant}
          onChange={() => {
            setUserTask({ ...userTask, isImportant: !userTask.isImportant });
          }}
        />
      </div>
      <div className="tags-edit">
        <label htmlFor="tags">Tags: </label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.currentTarget.value);
          }}
        />
        <button
          disabled={
            functions.disableButton(tagList, tagInput) === "delete" ||
            functions.disableButton(tagList, tagInput) === "not-enough"
          }
          onClick={() => {
            updateTags(tagInput, userTask.id, "add");
            setTagInput("");
            toast.success("tag added");
          }}
        >
          add
        </button>
        <button
          disabled={
            functions.disableButton(tagList, tagInput) === "add" ||
            functions.disableButton(tagList, tagInput) === "not-enough"
          }
          onClick={() => {
            updateTags(tagInput, userTask.id, "delete");
            setTagInput("");
          }}
        >
          delete
        </button>
      </div>
      <div className="tags-list">
        {tagList.map((tag) => (
          <p key={tag.id}>{tag.tagName}</p>
        ))}
      </div>
      <div className="create-note">
        <p>Create New Note: </p>
        <div className="note-title">
          <label htmlFor="noteTitle">Note Title:</label>
          <input
            type="text"
            name="noteTitle"
            id="noteTitle"
            onChange={(e) => {
              setNote({ ...note, noteTitle: e.currentTarget.value });
            }}
            value={note.noteTitle}
          />
        </div>
        <div className="note-content">
          <label htmlFor="note">Content:</label>
          <textarea
            name="note"
            id="note"
            value={note.content}
            onChange={(e) =>
              setNote({ ...note, content: e.currentTarget.value })
            }
          ></textarea>
        </div>
        <input
          className="submit-note"
          type="submit"
          value="Create Note"
          disabled={validations.isNoteNotEmpty(note.noteTitle, note.content)}
          onClick={() => {
            updateNotes({
              ...note,
              teamMemberId: user.id,
              taskId: userTask.id,
            });
            setNote(defaultData.getDefaultNote);
            toast.success("note added");
          }}
        />
      </div>
    </form>
  );
};
