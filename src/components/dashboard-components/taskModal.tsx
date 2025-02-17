
import {Task} from "../../classes/Task.ts";


export const TaskModal = ({
	task,
	setTask
}: {
	task: Task,
	setTask: (task: Task | undefined) => void
}) => {
	const {author, title, status, dueDate, creationDate, isUrgent, desc} = task.getTask()
	const [crYear, crMonth, crDay] = creationDate.split('-')
	const [year, month, day] = dueDate.split('-')
	
	const formDue = [month, day, year].join('/')
	const formCr = [crMonth, crDay, crYear].join('/')
	
	return (
		<div className='modal-cont'
		     onClick={(e) => e.target === e.currentTarget && setTask(undefined) }
		>
			<div className="task-modal">
				{isUrgent && (<i className="fa-solid fa-exclamation urgent"></i>)}
				<h3>{title}</h3>
				<div className="task-details-desc">
					<p>{desc}</p>
					<div className="task-details">
						<div className="detail">
							<p>Author: </p>
							<p>{author}</p>
						</div>
						<div className="detail">
							<p>Status: </p>
							<p>{status}</p>
						</div>
						<div className="detail">
							<p>Created: </p>
							<p>{formCr}</p>
						</div>
						<div className="detail">
							<p>Due: </p>
							<p>{formDue}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}