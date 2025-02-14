import {User} from "./User.ts";
import { TTaskLink, TTeam} from "../types/globalTypes.ts";
import {ITeam} from "../interfaces/ITeam.ts";
import {Task} from "./Task.ts";

export class Team implements ITeam{
    private name: string
    private teamLeader: User
    private users: User[]
    private id: number
    private tasks: Task[]
    private memTaskLinks: TTaskLink[]

    constructor(team: TTeam, users: User[], tasks: Task[], usersTaskLinks: TTaskLink[]) {
        const {name, id, teamLeadId} = team
        this.name = name
        this.id = id
        this.users = users
        this.teamLeader = users.find(user => user.getId() === teamLeadId)!
        this.tasks = tasks
        this.memTaskLinks = usersTaskLinks
    }

    getName = () => this.name
    getUsers = () => this.users
    getTeamLeader = () => this.teamLeader
    getId = () => this.id
    getTasks = () => this.tasks
    getUserTaskLinks = (userId: number) => {
        return this.memTaskLinks.filter((link) => link.teamMemberId === userId)
            .map(link => this.tasks.find(task => task.getId() === link.taskId)!)
    }
}