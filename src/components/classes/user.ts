import {TTeamMember} from "../../types/globalTypes.ts";
import {IUser} from "../interfaces/userInterface.ts";

export class User implements IUser{
    name: string
    private username: string
    private email: string
    private id: number

    constructor(user: TTeamMember) {
        const {name, username, email, id} = user
        this.name = name
        this.username = username
        this.email = email
        this.id = id
    }

    getUser = (): Omit<TTeamMember, 'id' | 'email'> => {
        return {
            name: this.name,
            username: this.username,
        }
    }

    getUserId = () => {
        return this.id
    }

    getUserEmail = () => {
        return this.email
    }

}