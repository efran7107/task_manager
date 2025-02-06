import {User} from "./User.ts";
import {TTeam} from "../../types/globalTypes.ts";
import {ITeam} from "../interfaces/ITeam.ts";

export class Team implements ITeam{
    private name: string;
    private members: User[];
    private teamLeader: User;
    private id: number;

    constructor(team: TTeam, members: User[]) {
        const {id, name, teamLeadId} = team
        this.name = name
        this.members = members
        this.teamLeader = members.find(members => members.getId() === teamLeadId)!
        this.id = id
    }

    getName = () => this.name
    getMembers = () => this.members
    getTeamLeader = () => this.teamLeader
    getId = () => this.id

}