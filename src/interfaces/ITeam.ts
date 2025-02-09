import {User} from "../classes/User.ts";

export interface ITeam {
    getName: () => string
    getUsers: () => User[]
    getTeamLeader: () => User
    getId: () => number
}