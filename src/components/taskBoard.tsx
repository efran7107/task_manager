import { Task } from "@/types/types";
import { Taks } from "./task";


export const TaskBoard = ({tasks}: {tasks: Task[]}) => {
    
    const sortedTasks = [
		tasks.filter(task => task.status === 'to-do'),
		tasks.filter(task => task.status === 'doing'),
		tasks.filter(task => task.status === 'done'),
	]
	const [toDo, doing, done] = sortedTasks
    console.log(toDo, doing, done);
    
    return (
        <div className="task-board">
            <div className="to-do">
                <h3>To Do</h3>
                {toDo.map(task => (
                    <Taks task={task}/>
                ))}
            </div>
            <div className="doing">
            <h3>Doing</h3>
            {doing.map(task => (
                    <Taks task={task}/>
                ))}
            </div>
            <div className="done">
            <h3>Done</h3>
            {done.map(task => (
                    <Taks task={task}/>
                ))}
            </div>
        </div>
    )
}