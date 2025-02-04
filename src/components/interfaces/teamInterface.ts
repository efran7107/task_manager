import {User} from "../classes/user.ts";
import {TTeam} from "../../types/globalTypes.ts";

export interface ITeam {
    name: string
    getTeamLeader: () => User
    getMembers: () => User[]
    getTeam: () => Omit<TTeam, 'id' | 'teamLeadId'>
    getTeamId: () => number
}