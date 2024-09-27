import { useUser } from "../../functions/providersContext"
import { Task } from "../../types/objectTypes"
import '../../styles/task-modal.css'


export const TaskModal = ({ task }: { task: Task }) => {
    const {allData} = useUser();
    const {users} = allData
    const {id, title, desc, status, dueDate, dateCreated, isUrgent, ucId} = task
    const userCreaterId = users.find(user => user.id === ucId)!
    return (
        <div id={id.toString()} className="task-modal">
            <h3>{title}</h3>
            <p>{desc}</p>
            <p>Status: {status}</p>
            <p>Due: {dueDate}</p>
            <p>Date Created: {dateCreated}</p>
            <p>Author: {userCreaterId.firstName} {userCreaterId.lastName}</p>
        </div>
    )
}