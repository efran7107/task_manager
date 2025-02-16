import {Component} from "react";
import {taskStatus, TPage, TTask} from "../types/globalTypes.ts";
import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";
import {defTeam, defUser} from "../functions/default.ts";
import {getUserData} from "../functions/apiFunctions.ts";
import {getDate} from "../functions/functions.ts";
import {UserInput} from "./inputs/userInput.tsx";
import '../css/createTask.css';

type creatTask = Omit<TTask, 'id' | 'teamId'>

type createTaskStates = {
	createTask: creatTask,
	activeUser: User,
	userTeams: Team[],
	activeTeam: Team,
	assignedUsers: number[]
}


const defCreateTask: creatTask = {
	title: '',
	desc: '',
	isUrgent: false,
	author: "",
	status: "to-do",
	creationDate: "1000-01-01",
	dueDate: "1000-01-01"
}
export class CreateTask extends Component<{
	setPage: (page: TPage) => void
	setIsLoading: (isLoading: boolean) => void
}, createTaskStates> {

	state = {
		createTask: defCreateTask,
		activeUser: defUser,
		userTeams: [defTeam],
		activeTeam: defTeam,
		assignedUsers: [defUser.getId()]
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
					activeTeam: activeTeam,
					assignedUsers: [user.getId()]
				})
				this.props.setIsLoading(false)
			})
	}

	setTask = (key: string, val: string | boolean | taskStatus) => {
		this.setState({...this.state, createTask: {...this.state.createTask, [key]: val }})
	}
	
	changeTeam = (teamName: string) => {
		this.setState({
			...this.state,
			activeTeam: this.state.userTeams.find(team => team.getName() === teamName)!,
			assignedUsers: [this.state.activeUser.getId()]
		})
	}
	
	addUser = (userId: number) => {
		this.setState({
			...this.state,
			assignedUsers: [...this.state.assignedUsers, userId]
		})
	}
	
	removeUser = (userId: number) => {
		const idIndex = this.state.assignedUsers.indexOf(userId)
		const newArr = [...this.state.assignedUsers.slice(0, idIndex), ...this.state.assignedUsers.slice(idIndex + 1)]
		this.setState({...this.state, assignedUsers: newArr})
	}
	
	addTask = () => {
	
	}

	render() {
		const {createTask, activeTeam, userTeams, activeUser, assignedUsers} = this.state
		const { isUrgent, creationDate, dueDate} = createTask


		return (
			<form className='task-form-entry' onSubmit={(e) => {
				e.preventDefault()
				this.addTask()
			}}>
				<div className="task-form">
					<div className="task-info">
						<h2>New Task:</h2>
						<UserInput id='title' curKey='title' label='Title' userInput={{
							onChange: (e) => {
								this.setTask('title', e.currentTarget.value)
							}
						}}/>
						<div className="user-desc-cont">
							<label htmlFor='desc'>Task Description: </label>
							<textarea style={{resize: "none"}}/>
						</div>
						<div className="is-urgent">
							<label htmlFor="isUrgent">Urgent</label>
							<input
								className='is-urgent-box'
								type="checkbox"
								defaultChecked={isUrgent}
								onClick={() => {
									this.setTask('isUrgent', isUrgent ? false : true)
								}}
							/>
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
						<h2>Assignments:</h2>
						<div className="choose-team">
							<select
								name="activeTeam"
								id="activeTeam"
								value={activeTeam.getName()}
								onChange={
									(e) =>
										this.changeTeam(e.currentTarget.value)
							}
							>
								{userTeams.map(team => (<option value={team.getName()} key={team.getId()}>{team.getName()}</option>))}
							</select>
						</div>
						<div className="choose-users">
							<div className="assign-to">
								<h4>Available: </h4>
								<div className="names-cont">
									{
										activeTeam.getUsers().map(user => {
											if(
												user.getId() !== activeTeam.getTeamLeader().getId() &&
												user.getId() !== activeUser.getId() &&
												assignedUsers.filter(id => id === user.getId()).length < 1
											)
												return (
													<p
														key={user.getId()}
														onClick={() => this.addUser(user.getId())}
													>
														{user.getUserNames().name}
													</p>)
										})
									}
								</div>
							</div>
							<div className="been-assigned">
								<h4>Assigned:</h4>
								<div className="names-cont">
									{
										this.state.assignedUsers
											.map(id => this.state.activeTeam.getUsers().find(user => user.getId() === id)!)
											.filter(user => user.getId() !== activeTeam.getTeamLeader().getId() && user.getId() !== activeUser.getId())
											.map(user =>
												<p
													key={user.getId()}
													onClick={() => this.removeUser(user.getId())}
												>
													{user.getUserNames().name}
												</p>)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				<input type="submit" value="Create Task"/>
			</form>
		)
	}
}