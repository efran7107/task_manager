import {TNote, TTask} from "../types/globalTypes.ts";
import {User} from "../classes/User.ts";

export interface ITask {
    getId: () => number
    getTask: () => Omit<TTask, 'id' | 'teamId'>
    getNotes: () => TNote[]
    getTeamId: () => number
    getAssignedUsers: () => Promise<User[]>
}