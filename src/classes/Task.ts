import {TNote, TTask} from "../types/globalTypes.ts";
import {ITask} from "../interfaces/ITask.ts";

export class Task implements ITask{
    private task: Omit<TTask, 'id' | 'teamId'>
    private id: number
    private teamId: number
    private notes: TNote[]

    constructor(task: TTask, notes: TNote[]) {
        const {['id']: id, ['teamId']: teamId, ...newTask} = task
        this.id = id
        this.teamId = teamId
        this.task = newTask
        this.notes = notes
    }

    getTask = () => this.task
    getId = () => this.id
    getTeamId = () => this.teamId
    getNotes = () => this.notes

}