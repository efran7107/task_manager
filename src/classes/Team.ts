import {User} from "./User.ts";
import {TTask, TTeam} from "../types/globalTypes.ts";
import {ITeam} from "../interfaces/ITeam.ts";

export class Team implements ITeam{
    private name: string
    private teamLeader: User
    private users: User[]
    private id: number
    private tasks: TTask[]

    constructor(team: TTeam, users: User[], tasks: TTask[]) {
        const {name, id, teamLeadId} = team
        this.name = name
        this.id = id
        this.users = users
        this.teamLeader = users.find(user => user.getId() === teamLeadId)!
        this.tasks = tasks
    }

    getName = () => this.name
    getUsers = () => this.users
    getTeamLeader = () => this.teamLeader
    getId = () => this.id
    getTasks = () => this.tasks
    
}