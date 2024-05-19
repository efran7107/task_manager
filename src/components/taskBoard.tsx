import { Tag, Task, TaskTagLink } from "@/types/types";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import { useUser } from "./componentsProvider/UserProvider";

const TaskModal = ({ task, tags }: { task: Task; tags: Tag[] }) => {
  console.log(task, tags);
  return <></>;
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

  const { setActiveTask, setIsActiveTask } = useUser();

  return (
    <div
      className={isPastDue ? "task-card  past-due" : "task-card"}
      onClick={(e) => {
        e.preventDefault();
        setActiveTask(task);
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

  const sortedTasks = [
    tasks.filter((task) => task.status === "to-do"),
    tasks.filter((task) => task.status === "doing"),
    tasks.filter((task) => task.status === "done"),
  ];
  const [toDo, doing, done] = sortedTasks;

  return (
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
  );
};
