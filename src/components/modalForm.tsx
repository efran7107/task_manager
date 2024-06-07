import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import { Note, Task } from "@/types/types";
import "@/styles/modalForm.css";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import { defaultData } from "@/functions/DefaultStates";
import toast from "react-hot-toast";

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
      <div className="task-name-input">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          name="taskName"
          id="taskName"
          value={`${userTask.taskName}`}
          onChange={(e) => {
            setUserTask({ ...userTask, taskName: e.target.value });
          }}
        />
      </div>
      <div className="task-description-input">
        <label htmlFor="taskDescription">Task: </label>
        <textarea
          name="taskDescription"
          id="taskDescription"
          value={userTask.description}
          onChange={(e) => {
            setUserTask({ ...userTask, description: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="date-input">
        <label htmlFor="dueDate">Due Date:</label>
        <div className="date">
          <label htmlFor="month">Month: </label>
          <input
            max="12"
            min="1"
            name="month"
            type="text"
            id="month"
            inputMode="numeric"
            maxLength={2}
            value={userTask.dueDate.split("/")[0]}
            onChange={(e) => {
              setUserTask({
                ...userTask,
                dueDate: `${e.target.value}/${userTask.dueDate.split("/")[1]}/${
                  userTask.dueDate.split("/")[2]
                }`,
              });
            }}
          />
          /<label htmlFor="day">Day: </label>
          <input
            min="1"
            max={functions.getMaxDaysForMonth(
              Number(userTask.dueDate.split("/")[0]),
              Number(userTask.dueDate.split("/")[2])
            )}
            name="day"
            type="text"
            id="day"
            inputMode="numeric"
            maxLength={2}
            value={userTask.dueDate.split("/")[1]}
            onChange={(e) => {
              setUserTask({
                ...userTask,
                dueDate: `${userTask.dueDate.split("/")[0]}/${e.target.value}/${
                  userTask.dueDate.split("/")[2]
                }`,
              });
            }}
          />
          /<label htmlFor="year">Year: </label>
          <input
            name="year"
            type="text"
            id="year"
            inputMode="numeric"
            maxLength={2}
            value={userTask.dueDate.split("/")[2]}
            onChange={(e) => {
              setUserTask({
                ...userTask,
                dueDate: `${userTask.dueDate.split("/")[0]}/${
                  userTask.dueDate.split("/")[1]
                }/${e.target.value}`,
              });
            }}
          />
        </div>
      </div>
      <div className="status-update">
        <label htmlFor="status">Status: </label>
        <label htmlFor="to-do">to-do</label>
        <input
          type="radio"
          name="to-do"
          id="to-do"
          checked={userTask.status === "to-do"}
          onChange={() => {
            setUserTask({ ...userTask, status: "to-do" });
          }}
        />
        <label htmlFor="doing">doing</label>
        <input
          type="radio"
          name="doing"
          id="doing"
          checked={userTask.status === "doing"}
          onChange={() => {
            setUserTask({ ...userTask, status: "doing" });
          }}
        />
        <label htmlFor="done">done</label>
        <input
          type="radio"
          name="done"
          id="done"
          checked={userTask.status === "done"}
          onChange={() => {
            setUserTask({ ...userTask, status: "done" });
          }}
        />
      </div>
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
