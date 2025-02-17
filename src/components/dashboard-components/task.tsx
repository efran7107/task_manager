import {Component} from "react";
import {Task} from "../../classes/Task.ts";

export class TaskCard extends Component<{
    task: Task
    setActiveTask: (task: Task) => void
}> {

    render() {
        const {task, setActiveTask} = this.props
        const taskObj = task.getTask()
        const {title, status, author, dueDate, isUrgent} = taskObj
        const numNotes = task.getNotes().length
        return(
            <div className='task-card' onClick={() => setActiveTask(task)}>
                <h4>{title}</h4>
              <div className="desc">
                <p>{status}</p>
                <p>Created By: {author}</p>
                <p>{dueDate}</p>
              </div>
              <p><i className="fa-regular fa-note-sticky note"></i>: {numNotes}</p>
              {isUrgent && (<i className="fa-solid fa-exclamation urgent"></i>)}
            </div>
        )
    }
}