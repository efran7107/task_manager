import {Component} from "react";
import {taskStatus, TPage, TTask} from "../types/globalTypes.ts";
import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";
import {defTeam, defUser} from "../functions/default.ts";
import {getUserData} from "../functions/apiFunctions.ts";
import {getDate} from "../functions/finctions.ts";
import {UserInput} from "./inputs/userInput.tsx";

type creatTask = Omit<TTask, 'id' | 'teamId'>

type createTaskStates = {
	createTask: creatTask,
	user: User,
	userTeams: Team[],
	activeTeam: Team
}


const defCreateTask: creatTask = {
	title: '',
	desc: '',
	isUrgent: false,
	author: "",
	status: "to-do",
	creationDate: "1/1/00",
	dueDate: "1/1/00"
}
export class CreateTask extends Component<{
	setPage: (page: TPage) => void
	setIsLoading: (isLoading: boolean) => void
}, createTaskStates> {

	state = {
		createTask: defCreateTask,
		user: defUser,
		userTeams: [defTeam],
		activeTeam: defTeam
	}

	componentDidMount() {
		const username = localStorage.getItem('username')!
		this.props.setIsLoading(true)
		getUserData(username)
			.then((userData) => {
				const {user, userTeams, activeTeam} = userData
				this.setState({
					createTask: {
						...this.state.createTask,
						author: user.getUserNames().username,
						creationDate: getDate(),
						dueDate: getDate(),

					},
					user: user,
					userTeams: userTeams,
					activeTeam: activeTeam
				})
				this.props.setIsLoading(false)
			})
	}

	setTask = (key: string, val: string | boolean | taskStatus) => {
		this.setState({...this.state, createTask: {...this.state.createTask, [key]: val }})
	}

	render() {
		const {title, desc, isUrgent, author, status, creationDate, dueDate} = this.state.createTask

		return (
			<form action="">
				<div className="task-info">
					<UserInput id='title' curKey='title' label='Title' userInput={{
						onChange: (e) => {
							this.setTask('title', e.currentTarget.value)
						}
					}}/>
					<UserInput id='desc' curKey='desc' label='Desc' userInput={{
						onChange: (e) => {
							this.setTask('desc', e.currentTarget.value)
						}
					}}/>

				</div>
			</form>
		)
	}
}