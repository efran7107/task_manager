import {TNote, TTask} from "../types/globalTypes.ts";
import {ITask} from "../interfaces/ITask.ts";
import {User} from "./User.ts";
import {apiOptions} from "../api.tsx";

export class Task implements ITask{
    private task: Omit<TTask, 'id' | 'teamId'>
    private id: number
    private teamId: number
    private notes: TNote[]
    private assignedUsers: number[]

    constructor(task: TTask, notes: TNote[], userIds: number[]) {
        const {['id']: id, ['teamId']: teamId, ...newTask} = task
        this.id = id
        this.teamId = teamId
        this.task = newTask
        this.notes = notes
        this.assignedUsers = userIds
    }

    getTask = () => this.task
    getId = () => this.id
    getTeamId = () => this.teamId
    getNotes = () => this.notes
    getAssignedUsers = async () => {
        const assignedUsers: User[] = []
        for(const id of this.assignedUsers){
            const user = await apiOptions.getRequests.getSingleData('teamMembers', 'id', id)
            assignedUsers.push(user)
        }
        return assignedUsers
    }

}