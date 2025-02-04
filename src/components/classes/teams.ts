import {User} from "./user.ts";
import {TMemTeamLink, TTeam, TTeamMember} from "../../types/globalTypes.ts";
import {apiOptions} from "../../api.tsx";

export class Team {
	private id: number
	private name: string;
	private users: User[];
	private teamLeader: User;
	
	constructor(team: TTeam) {
		const {id, name, teamLeadId} = team
		this.id = id;
		this.name = name;
		this.getUsers(teamLeadId).then(users => this.users = users)
	}
	
	private getUsers = async (teamId: number) => {
		const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getFilteredData('memTeamLinks', 'teamId', teamId)
		const users: TTeamMember[] = await apiOptions.getRequests.getDataInfo('teamMembers');
		return memTeamLinks.map(link => new User(users[link.userId] ))
	}
	
	
	getUserData = (): TTeam => {
		return {
			id: this.id,
			name: this.name,
			numOfMembers: this.users.length,
			teamLeadId: this.teamLeader.getUser().id
		}
	}
	
}