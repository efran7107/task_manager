import {Component} from "react";
import {TPage, TTask} from "../types/globalTypes.ts";

type creatTaskProp = Omit<TTask, 'id' | 'teamId'>
const defCreateTask: creatTaskProp = {
	title: '',
	desc: '',
	isUrgent: false,
	author: "efran7107",
	status: "to-do",
	creationDate: "1/1/25",
	dueDate: "2/28/25"
}
export class CreateTask extends Component<{
	setPage: (page: TPage) => void
}, creatTaskProp>{
	 state = defCreateTask
	
	render() {
		 const { setPage } = this.props
			const title = this.state.title
		console.log(title)
		return (
			<div className='task-form-cont'>

			</div>
		);
	}
}