import {TTeamMember} from "../types/globalTypes.ts";
import {IUser} from "../interfaces/IUser.ts";

export class User implements IUser{
    private name: string;
    private username: string;
    private email: string;
    private id: number;

    constructor(user: TTeamMember) {
        const {id, name, username, email} = user
        this.name = name
        this.username = username
        this.email = email
        this.id = id
    }

    getUserNames = () => {
        return {name: this.name, username: this.username}
    }

    getEmail = () => this.email

    getId = () => this.id

}
