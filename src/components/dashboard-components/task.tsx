import {Component} from "react";
import {Task} from "../../classes/Task.ts";

export class TaskCard extends Component<{
    task: Task
}> {

    render() {
        const {task} = this.props
        const taskObj = task.getTask()
        const {title, status, author, dueDate, isUrgent} = taskObj
        const taskId = task.getId()
        const numNotes = task.getNotes().length
        return(
            <div className='task-card'>
                <h4>{title}</h4>
                <p>{status}</p>
                <p>Created By: {author}</p>
                <p>{dueDate}</p>
            </div>
        )
    }
}