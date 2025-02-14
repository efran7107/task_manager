import {TNote, TTask} from "../types/globalTypes.ts";

export interface ITask {
    getId: () => number
    getTask: () => Omit<TTask, 'id' | 'teamId'>
    getNotes: () => TNote[]
    getTeamId: () => number
}