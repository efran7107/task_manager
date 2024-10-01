import { useUser } from "../../functions/providersContext"
import { Task } from "../../types/objectTypes"
import '../../styles/task-modal.css'
import { defaultNewTask } from "../../functions/defaultStates";


export const TaskModal = ({ 
    task, 
    setHasActiveTask, 
    setActiveTask 
}: { 
    task: Task;
    setHasActiveTask: (hasActiveTask: boolean) => void;
    setActiveTask: (activeTask: Task) => void 
}) => {
    const {allData, setPage} = useUser();
    const {users} = allData
    const {id, title, desc, status, dueDate, dateCreated, isUrgent, ucId} = task
    const userCreaterId = users.find(user => user.id === ucId)!
    return (
        <div id={id.toString()} className="task-modal">
            <i className="fa-solid fa-circle-xmark" onClick={() => {
                setHasActiveTask(false)
                setActiveTask({...defaultNewTask, id: 0})
            }}></i>
            {isUrgent && <span className="urgent">Urgent</span>}            
            <h3>{title}</h3>
            <p>{desc}</p>
            <p>Status: {status}</p>
            <p>Due: {dueDate}</p>
            <p>Date Created: {dateCreated}</p>
            <p>Author: {userCreaterId.firstName} {userCreaterId.lastName}</p>
            <input type="button" value={'\uf044'} onClick={() => setPage('edit-task')}/>
        </div>
    )
}
