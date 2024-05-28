import { Tag, Task, TaskTagLink } from "@/types/types";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import { useUser } from "./componentsProvider/UserProvider";
import { useState } from "react";
import { TaskModalForm } from "./modalForm";

const TaskModal = ({
  task,
  tags,
  date,
}: {
  task: Task;
  tags: Tag[];
  date: string;
}) => {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const { activeTask, isActiveTask, closeActiveTask, allData } = useUser();
  const taskNotes = allData.notes.filter(
    (note) => note.taskId === activeTask.id
  );
  const isPastDue = validations.isPastDue(date, task.dueDate);
  return (
    <>
      {isEditingTask ? (
        <TaskModalForm
          task={activeTask}
          editTask={setIsEditingTask}
          pastDue={isPastDue}
        />
      ) : (
        <div
          className={`modal-container ${isActiveTask ? "active" : ""} ${
            isPastDue ? "past-duedate" : ""
          }`}
        >
          <i
            className={
              task.isImportant
                ? "fa-solid fa-triangle-exclamation important"
                : "fa-solid fa-triangle-exclamation"
            }
          ></i>
          <i
            className="fa-solid fa-pen-to-square"
            onClick={(e) => {
              e.preventDefault();
              setIsEditingTask(true);
            }}
          ></i>
          <i
            className="fa-solid fa-xmark"
            onClick={(e) => {
              e.preventDefault();
              closeActiveTask();
            }}
          ></i>
          <h3>{task.taskName}</h3>
          <p>{task.description}</p>
          <div className="statuses">
            <p>
              Due Date: {task.dueDate} {isPastDue ? "PAST DUE" : ""}
            </p>
            <p>Status: {task.status}</p>
            {task.isImportant && <p>Important</p>}
          </div>
          <div className="tags">
            {tags.map((tag) => (
              <p key={tag.id}>{tag.tagName}</p>
            ))}
          </div>
          <div className="notes-section">
            <h5>notes:</h5>
            {taskNotes.map((note) => (
              <div key={note.id} className="note">
                <h6>{note.noteTitle}</h6>
                <p>{note.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Tasks = ({
  task,
  date,
  tags,
}: {
  task: Task;
  date: string;
  tags: Tag[];
}) => {
  const isPastDue = validations.isPastDue(date, task.dueDate);

  const { setActiveTask, setIsActiveTask, isActiveTask, allData } = useUser();

  return (
    <div
      className={isPastDue ? "task-card  past-due" : "task-card"}
      onClick={(e) => {
        e.preventDefault();
        if (isActiveTask) {
          return;
        }
        setActiveTask({ ...task });
        setIsActiveTask(true);
      }}
    >
      <h2>{task.taskName}</h2>
      <p>{task.description}</p>
      <p>Due Date: {isPastDue ? `${task.dueDate} PAST DUE!` : task.dueDate}</p>
      <p>status: {task.status}</p>
      {tags.length > 0 && (
        <p>
          {tags.map((tag) => (
            <span key={tag.id}>{tag.tagName}</span>
          ))}
        </p>
      )}
      <p>
        Notes:{" "}
        {allData.notes.filter((notes) => notes.taskId === task.id).length}
      </p>
    </div>
  );
};

export const TaskBoard = ({
  tasks,
  tags,
  taskTags,
}: {
  tasks: Task[];
  tags: Tag[];
  taskTags: TaskTagLink[];
}) => {
  const todaysDate = functions.getTodaysDate();

  const { activeTask } = useUser();

  const sortedTasks = [
    tasks.filter((task) => task.status === "to-do"),
    tasks.filter((task) => task.status === "doing"),
    tasks.filter((task) => task.status === "done"),
  ];
  const [toDo, doing, done] = sortedTasks;

  return (
    <>
      <div className="task-board">
        <div className="task-section to-do">
          <h3>To Do</h3>
          {toDo.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              date={todaysDate}
              tags={functions.getTags(tags, taskTags, task.id)}
            />
          ))}
        </div>
        <div className="task-section doing">
          <h3>Doing</h3>
          {doing.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              date={todaysDate}
              tags={functions.getTags(tags, taskTags, task.id)}
            />
          ))}
        </div>
        <div className="task-section done">
          <h3>Done</h3>
          {done.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              date={todaysDate}
              tags={functions.getTags(tags, taskTags, task.id)}
            />
          ))}
        </div>
      </div>
      <TaskModal
        tags={functions.getTags(tags, taskTags, activeTask.id)}
        task={activeTask}
        date={todaysDate}
      />
    </>
  );
};
