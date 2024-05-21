import { Tag, Task, TaskTagLink } from "@/types/types";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import { useUser } from "./componentsProvider/UserProvider";
import { useState } from "react";

const TaskModal = ({ task, tags, date }: { task: Task; tags: Tag[], date: string }) => {
  const [isEditingTask, setIsEditingTask] = useState(false)
  const {activeTask, setActiveTask, isActiveTask, closeActiveTask} = useUser();
  const isPastDue = validations.isPastDue(date, task.dueDate)
  return( 
    <>
      {isEditingTask ? (
        <form className={`modal-container active ${isPastDue ? 'past-duedate' : ''}`}>
          <i className="fa-solid fa-xmark" onClick={(e) => {
            e.preventDefault();
            setIsEditingTask(false);
            closeActiveTask();
          }}></i>
          <div className="task-name-input">
            <label htmlFor="taskName">Task Name:</label>
            <input 
              type="text" 
              name="taskName" 
              id="taskName" 
              value={`${activeTask.taskName}`}
              onChange={(e) => {
                setActiveTask({...activeTask, taskName: e.target.value})
              }}
              />
          </div>
          <div className="task-description-input">
            <label htmlFor="taskDescription">Task: </label>
            <textarea name="taskDescription" id="taskDescription" value={activeTask.description} onChange={(e) => {
              setActiveTask({...activeTask, description: e.target.value})
            }}></textarea>
          </div>
          <div className="date-input">
            <label htmlFor="dueDate">Due Date:</label>
            <div className="date">
              <label htmlFor="month">Month: </label>
              <input max='12' name="month" type="number" id="month" value={activeTask.dueDate.split('/')[0]} onChange={(e) => {
                setActiveTask({...activeTask, dueDate: `${e.target.value}/${activeTask.dueDate.split('/')[1]}/${activeTask.dueDate.split('/')[2]}`})
              }}/>
              /
              <label htmlFor="day">Day: </label>
              <input name="day" type="number" id="day" value={activeTask.dueDate.split('/')[1]} onChange={(e) => {
                setActiveTask({...activeTask, dueDate: `${activeTask.dueDate.split('/')[0]}/${e.target.value}/${activeTask.dueDate.split('/')[2]}`})
              }}/>
              /
              <label htmlFor="year">Year: </label>
              <input name="year" type="number" id="year" value={activeTask.dueDate.split('/')[2]} onChange={(e) => {
                setActiveTask({...activeTask, dueDate: `${activeTask.dueDate.split('/')[0]}/${activeTask.dueDate.split('/')[1]}/${e.target.value}`})
              }}/>
            </div>
            <div className="status-update">
            <label htmlFor="status">Status: </label>
              <div className="to-do-radio">
                <label htmlFor="to-do">to-do</label>
                <input 
                  type="radio" 
                  name="to-do" 
                  id="to-do" 
                  checked={task.status==='to-do'}
                  onChange={() => {
                    setActiveTask({...activeTask, status: 'to-do'})
                  }}
                />
              </div>
              <div className="doing-radio">
                <label htmlFor="doing">doing</label>
                <input 
                  type="radio" 
                  name="doing" 
                  id="doing" 
                  checked={task.status==='doing'}
                  onChange={() => {
                    setActiveTask({...activeTask, status: 'doing'})
                  }}
                />
              </div>
              <div className="done-radio">
                <label htmlFor="done">done</label>
                <input 
                  type="radio" 
                  name="done" 
                  id="done" 
                  checked={task.status==='done'}
                  onChange={() => {
                    setActiveTask({...activeTask, status: 'done'})
                  }}
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className={`modal-container ${isActiveTask ? 'active' : ''} ${isPastDue ? 'past-duedate' : ''}`}>
          <i className={task.isImportant ? "fa-solid fa-triangle-exclamation important" :"fa-solid fa-triangle-exclamation"}></i>
          <i className="fa-solid fa-pen-to-square" onClick={(e) => {
            e.preventDefault();
            setIsEditingTask(true);
          }}></i>
          <i className="fa-solid fa-xmark"onClick={(e) => {
            e.preventDefault();
            closeActiveTask();
          }}></i>
          <h3>{task.taskName}</h3>
          <p>{task.description}</p>
          <div className="statuses">
            <p>Due Date: {task.dueDate} {isPastDue ? 'PAST DUE' : ''}</p>
            <p>Status: {task.status}</p>
            {task.isImportant && <p>Important</p>}
          </div>
          <div className="tags">
            {tags.map(tag => (
              <p key={tag.id}>{tag.tagName}</p>
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

  const { setActiveTask, setIsActiveTask, isActiveTask } = useUser();

  return (
    <div
      className={isPastDue ? "task-card  past-due" : "task-card"}
      onClick={(e) => {
        e.preventDefault();
        if(isActiveTask){
          return
        }
        setActiveTask({...task});
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

  const {activeTask} = useUser();

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
      <TaskModal tags={functions.getTags(tags, taskTags, activeTask.id)}  task={activeTask} date={todaysDate}/>
    </>
    

  );
};
