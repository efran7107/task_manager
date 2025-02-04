import {TTeamMember} from "../../types/globalTypes.ts";

export class User {
	private id: number;
	private name: string;
	private username: string;
	private email: string;
	
	constructor(user: TTeamMember) {
		const {id, name, username, email} = user
		this.id = id;
		this.name = name;
		this.username = username;
		this.email = email;
	}
	
	
	
	getUser = (): TTeamMember => {
		return{
			id: this.id,
			name: this.name,
			username: this.username,
			email: this.email
		}
	}
	
	
	
	
	
}