import {User} from "../classes/User.ts";
import {Task} from "../classes/Task.ts";

export interface ITeam {
    getName: () => string
    getUsers: () => User[]
    getTeamLeader: () => User
    getId: () => number
    getTasks: () => Task[]
    getUserTaskLinks: (userId: number) => Task[]
}