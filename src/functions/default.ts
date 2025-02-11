import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";
import {TTask} from "../types/globalTypes.ts";

export const defUser: User = new User({
    id: -1,
    name: '',
    email: '',
    username: ''
})

export const defTask: TTask = {
    "id": -1,
    "title": "",
    "desc": "",
    "isUrgent": false,
    "author": "",
    "status": "to-do",
    "creationDate": "1/1/00",
    "dueDate": "1/1/00",
    "teamId": -1
}

export const defTeam: Team = new Team({
    id: -1,
    name: '',
    numOfMembers: 1,
    teamLeadId: -1
}, [defUser], [defTask])

