import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";

export const defUser: User = new User({
    id: -1,
    name: '',
    email: '',
    username: ''
})

export const defTeam: Team = new Team({
    id: -1,
    name: '',
    numOfMembers: 1,
    teamLeadId: -1
}, [defUser])

