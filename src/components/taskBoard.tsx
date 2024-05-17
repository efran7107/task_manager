import { Task } from "@/types/types";
import "@/styles/taskBoard.css";


const Tasks = ({task}: {task: Task}) => {
    return (
        <div className="task-card">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>status: {task.status}</p>
        </div>
    )
}

export const TaskBoard = ({tasks}: {tasks: Task[]}) => {
    
    const sortedTasks = [
		tasks.filter(task => task.status === 'to-do'),
		tasks.filter(task => task.status === 'doing'),
		tasks.filter(task => task.status === 'done'),
	]
	const [toDo, doing, done] = sortedTasks;
    
    
    return (
        <div className="task-board">
            <div className="task-section to-do">
                <h3>To Do</h3>
                {toDo.map(task => (
                    <Tasks key={task.id} task={task}/>
                ))}
            </div>
            <div className="task-section doing">
            <h3>Doing</h3>
            {doing.map(task => (
                    <Tasks key={task.id} task={task}/>
                ))}
            </div>
            <div className="task-section done">
            <h3>Done</h3>
            {done.map(task => (
                    <Tasks key={task.id} task={task}/>
                ))}
            </div>
        </div>
    )
}