import {TTeamMember} from "../../types/globalTypes.ts";
import {IUser} from "../interfaces/IUser.ts";

export class User implements IUser{
    private name: string;
    private username: string;
    private email: string;
    private id: number;

    constructor(teamMember: TTeamMember) {
        const {id, name, email, username} = teamMember
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
    }

    getUser = (): Omit<TTeamMember, 'id' | 'email'> => {
        return {
            name: this.name,
            username: this.username,
        }
    }

    getEmail = () => this.email
    getId = () => this.id

}