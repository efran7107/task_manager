import {User} from "../classes/User.ts";

export interface ITeam {
    getName: () => string
    getId: () => number
    getMembers: () => User[]
    getTeamLeader: () => User
}