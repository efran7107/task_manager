import {User} from "./User.ts";
import {TTeam} from "../types/globalTypes.ts";
import {ITeam} from "../interfaces/ITeam.ts";

export class Team implements ITeam{
    private name: string
    private teamLeader: User
    private users: User[]
    private id: number

    constructor(team: TTeam, users: User[]) {
        const {name, id, teamLeadId} = team
        this.name = name
        this.id = id
        this.users = users
        this.teamLeader = users.find(user => user.getId() === teamLeadId)!
    }

    getName = () => this.name
    getUsers = () => this.users
    getTeamLeader = () => this.teamLeader
    getId = () => this.id

}