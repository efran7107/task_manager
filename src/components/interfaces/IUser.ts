import {TTeamMember} from "../../types/globalTypes.ts";

export interface IUser {
    getUser: () => Omit<TTeamMember, 'id' | 'email'>
    getEmail: () => string
    getId: () => number
 }