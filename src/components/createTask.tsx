import {Component} from "react";
import {taskStatus, TPage, TTask} from "../types/globalTypes.ts";
import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";
import {defTeam, defUser} from "../functions/default.ts";
import {getUserData} from "../functions/apiFunctions.ts";
import {getDate} from "../functions/functions.ts";
import {UserInput} from "./inputs/userInput.tsx";

type creatTask = Omit<TTask, 'id' | 'teamId'>

type createTaskStates = {
	createTask: creatTask,
	activeUser: User,
	userTeams: Team[],
	activeTeam: Team
}


const defCreateTask: creatTask = {
	title: '',
	desc: '',
	isUrgent: false,
	author: "",
	status: "to-do",
	creationDate: "0000-01-01",
	dueDate: "0000-01-01"
}
export class CreateTask extends Component<{
	setPage: (page: TPage) => void
	setIsLoading: (isLoading: boolean) => void
}, createTaskStates> {

	state = {
		createTask: defCreateTask,
		activeUser: defUser,
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
					activeUser: user,
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
		const {createTask, activeTeam, userTeams, activeUser} = this.state
		const { isUrgent, creationDate, dueDate} = createTask


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
						},
					}}/>
					<div className="is-urgent">
						<label htmlFor="isUrgent">Urgent</label>
						<input type="checkbox" defaultChecked={isUrgent}/>
					</div>
					<div className="due-date">
						<label htmlFor="dueDate">Due Date: </label>
						<input
							type="date"
							onChange={(e) => {
								this.setTask('dueDate', e.currentTarget.value)
							}}
							value={dueDate}
							min={creationDate}/>
					</div>
				</div>
				<div className="choose-team-cont">
					<div className="choose-team">
						<select
							name="activeTeam"
							id="activeTeam"
							value={activeTeam.getName()}
							onChange={
								(e) => {
									this.setState({...this.state, activeTeam: userTeams.find(team => team.getName() === e.currentTarget.value)!})
								}
							}
						>
							{userTeams.map(team => (<option value={team.getName()} key={team.getId()}>{team.getName()}</option>))}
						</select>
					</div>
					<div className="choose-users">
						<div className="assign-to">
							{activeTeam.getUsers().map((user) => {
									if(user.getId() !== activeTeam.getTeamLeader().getId() && user.getId() !== activeUser.getId())
										return(<p key={user.getId()}>{user.getUserNames().name}</p>)
							})}
						</div>
						<div className="been-assigned"></div>
					</div>
				</div>
			</form>
		)
	}
}