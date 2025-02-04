import {TTeamMember} from "../../types/globalTypes.ts";

export interface IUser {
    name: string
    getUser:() => Omit<TTeamMember, 'id' | 'email'>
    getUserId:() => number
    getUserEmail:() => string
}