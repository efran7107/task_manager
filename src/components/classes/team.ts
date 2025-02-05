import {ITeam} from "../interfaces/teamInterface.ts";
import {TMemTeamLink, TTeam, TTeamMember} from "../../types/globalTypes.ts";
import {User} from "./user.ts";
import {apiOptions} from "../../api.tsx";

export class Team implements ITeam{
    name: string
    private users: User[]
    private teamLeader: User
    private id: number
    private team: TTeam

    constructor(team: TTeam) {
        const {id, name, teamLeadId} = team
        this.id = id
        this.name = name
        this.users = []
        this.teamLeader = new User({id: teamLeadId, name: '', email: '', username: ''})
        this.team = team
        this.fetchLeaderAndUsers(teamLeadId)
    }

    private fetchLeaderAndUsers = async (teamLeadId: number) => {
        const user: TTeamMember = await apiOptions.getRequests.getSingleData('teamMembers', 'id', teamLeadId)
        if(!user) return
        this.teamLeader = new User(user)
        const userLinks = await apiOptions.getRequests.getFilteredData('memTeamLinks', 'teamId', teamLeadId)
        this.users = await apiOptions.getRequests.getDataInfo('teamMembers')
            .then((userArr: TTeamMember[]) =>
                userArr.filter(user =>
                    userLinks.find((link: TMemTeamLink) => link.userId === user.id)
                ).map(user =>
                    new User(user)
                )
            )
    }

    getTeamLeader = () => this.teamLeader
    getTeam = () => this.team
    getMembers = () => this.users
    getTeamId = () => this.id
}