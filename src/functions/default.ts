import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";
import {TNote} from "../types/globalTypes.ts";
import {Task} from "../classes/Task.ts";

export const defUser: User = new User({
    id: -1,
    name: '',
    email: '',
    username: ''
})

export const defNote: TNote = {
        "id": -1,
        "title": "",
        "desc": "",
        "date": "1/1/00",
        "taskId": -1,
        "authId": -1
    }

export const defTask: Task = new Task({
    "id": -1,
    "title": "",
    "desc": "",
    "isUrgent": false,
    "author": "",
    "status": "to-do",
    "creationDate": "1/1/00",
    "dueDate": "1/1/00",
    "teamId": -1
}, [defNote])

export const defTaskLink = {
    id: -1,
    taskId: -1,
    teamMemberId: -1
}

export const defTeam: Team = new Team({
    id: -1,
    name: '',
    numOfMembers: 1,
    teamLeadId: -1
}, [defUser], [defTask], [defTaskLink])

