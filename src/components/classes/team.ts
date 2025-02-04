import {ITeam} from "../interfaces/teamInterface.ts";
import {TTeam} from "../../types/globalTypes.ts";
import {User} from "./user.ts";

export class Team implements ITeam{
    name: string
    private users: User[]
    private teamLeader: User
    private id: number
    private team: TTeam

    constructor(team: TTeam, users: User[], teamLeader: User) {
        const {id, name} = team
        this.id = id
        this.name = name
        this.users = users
        this.teamLeader = teamLeader
        this.team = team
    }

    getTeamLeader = () => this.teamLeader
    getTeam = () => this.team
    getMembers = () => this.users
    getTeamId = () => this.id
}