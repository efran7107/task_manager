import { Task } from "../../types/objectTypes";
import { useUser } from "../../functions/providersContext";

export const TaskDisplay = ({
  toDo,
  doing,
  done,
  setHasActiveTask
}: {
  toDo: Task[];
  doing: Task[];
  done: Task[];
  setHasActiveTask: (hasActiveTask: boolean) => void
}) => {
  return (
    <>
      <div className="task-row">
        <h3>to-do</h3>
        {toDo.map((task) => {
          return <TaskCard key={task.id} task={task} setHasActiveTask={setHasActiveTask}/>;
        })}
      </div>
      <hr />
      <div className="task-row">
        <h3>doing</h3>
        {doing.map((task) => {
          return <TaskCard key={task.id} task={task} setHasActiveTask={setHasActiveTask}/>;
        })}
      </div>
      <hr />
      <div className="task-row">
        <h3>done</h3>
        {done.map((task) => {
          return <TaskCard key={task.id} task={task} setHasActiveTask={setHasActiveTask}/>;
        })}
      </div>
    </>
  );
};

const TaskCard = ({ 
  task, 
  setHasActiveTask,
}: { 
  task: Task, 
  setHasActiveTask: (hasActiveTask: boolean) => void,
}) => {
  const { allData, setActiveTask } = useUser();
  const { users, tags, taggedTasks, notes } = allData;
  const { title, desc, status, dueDate, isUrgent, ucId } = task;
  const taskCreater = users.find((user) => user.id === ucId)!;
  const taggedTask = taggedTasks.filter((link) => link.taskId === task.id);
  const taskTags = taggedTask.map((link) => {
    const tag = tags.find((tag) => tag.id === link.tagId);
    return tag;
  });
  const taskNotesNumber = notes.filter(
    (note) => note.taskId === task.id
  ).length;

  return (
    <div 
      className="task"
      onClick={() => {
        setActiveTask(task)
        setHasActiveTask(true)
      }}  
    >
      {isUrgent && <i className="fa-solid fa-exclamation"></i>}
      <h4>{title}</h4>

      <div className="task-details">
        <span>
          <i className="fa-regular fa-note-sticky"></i> : {taskNotesNumber}
        </span>
        <p>{desc}</p>
        <p>{status}</p>
        <p>due: {dueDate}</p>
        <p>creater: {taskCreater.username}</p>
        <div className="tags">
          {taskTags.map((tag) => (
            <p key={tag?.id}>{tag?.tag}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
