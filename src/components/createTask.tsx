import {Component} from "react";
import {TPage, TTask} from "../types/globalTypes.ts";

type creatTask = Omit<TTask, 'id' | 'teamId'>



const defCreateTask: creatTask = {
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
}, creatTask> {

	state = defCreateTask
	render() {

		return <></>
	}
}