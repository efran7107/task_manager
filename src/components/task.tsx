import { Task } from "@/types/types";


export const Taks = ({task}: {task: Task}) => {
    return (
        <div className="task-card">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            <p>Due Date: {}</p>
            <p>status: {task.status}</p>
        </div>
    )
}