import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import { Task } from "@/types/types";
import "@/styles/modalForm.css";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";

export const TaskModalForm = ({
  task,
  pastDue,
  editTask,
}: {
  task: Task;
  pastDue: boolean;
  editTask: (edit: boolean) => void;
}) => {
  const { closeActiveTask, allData } = useUser();
  const {tags, taskTags} = allData
  const [userTask, setUserTask] = useState<Task>(task);
  const [tagInput, setTagInput] = useState('');
  const taskTag = functions.getTags(tags, taskTags, userTask.id)

  return (
    <form
      className={`modal-container active ${pastDue ? "past-duedate" : ""} edit`}
    >
      <i
        className="fa-solid fa-xmark"
        onClick={(e) => {
          e.preventDefault();
          editTask(false);
          closeActiveTask();
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
        <div className="to-do-radio">
          <label htmlFor="to-do">to-do</label>
          <input
            type="radio"
            name="to-do"
            id="to-do"
            checked={userTask.status === "to-do"}
            onClick={() => {
              setUserTask({ ...userTask, status: "to-do" });
            }}
          />
        </div>
        <div className="doing-radio">
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
        </div>
        <div className="done-radio">
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
      </div>
      <div className="important-input">
        <label htmlFor="important">Important: </label>
        <input
          type="checkbox"
          name="important"
          id="important"
          checked={userTask.isImportant}
          onChange={() => {
            setUserTask({ ...userTask, isImportant: !userTask.isImportant });
          }}
        />
      </div>
      <div className="tags-edit">
        <label htmlFor="tags">Tags: </label>
        <input type="text" list="tags"
        onChange={(e) => {
          setTagInput(e.currentTarget.value)
          
        }}/>
        <datalist id="tags">
          {taskTag.map(tag => (
            <option key={tag.id} value={tag.tagName}>{tag.tagName}</option>
          ))}
        </datalist>
        <button 
          disabled={functions.disableButton(taskTag, tagInput) === 'delete' || functions.disableButton(taskTag, tagInput) === 'not-enough'}
          onClick={(e) => {
          e.preventDefault()
        }}>add</button>
        <button 
          disabled={functions.disableButton(taskTag, tagInput) === 'add' || functions.disableButton(taskTag, tagInput) === 'not-enough'}
          onClick={(e) => {
            e.preventDefault()
          }}
        >delete</button>
      </div>
    </form>
  );
};
