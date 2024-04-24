import { Requests } from '@/api/api';
import { Team, TeamMember, TeamMemberTeamsLink } from '@/types/types';

const getHeaderContainer = () => {
	const headerContainer = document.getElementById('header');
	headerContainer?.classList.add('dashboard');
	headerContainer?.children[0].classList.add('dashboard');
};

const getUserTeam = async (userId: number) => {
	const teamLinkIds = await Requests.getUserTeamLink(userId).then((links) =>
		links.map((link) => link.teamId)
	);

	const userTeams: Team[] = [];

	for (const id of teamLinkIds) {
		Requests.getTeamById(id).then((team) => {
			userTeams.push(team);
		});
	}
	return userTeams;
};

const getuserTeamMembers = async (userId: number) => {
	const teamLinkIds = await Requests.getUserTeamLink(userId).then((links) =>
		links.map((link) => link.teamId)
	);
	const teamTeamMembersLinks: Array<TeamMemberTeamsLink[]> = [];
	for (const id of teamLinkIds) {
		teamTeamMembersLinks.push(await Requests.getUserTeamMembersTeamLinks(id));
	}

	const userTeamMembers: TeamMember[][] = [];
	for (const team of teamTeamMembersLinks) {
		const teamArr: TeamMember[] = [];
		for (const link of team) {
			if (link.teamMemberId === userId) continue;
			const member = await Requests.getTeamMemberById(link.teamMemberId);
			teamArr.push(member);
		}
		userTeamMembers.push(teamArr);
	}
	return userTeamMembers;
};

const getUserInfo = async (user: TeamMember | undefined) => {
	return {
		user: user,
		team: await getUserTeam(user!.id),
		teamMembers: await getuserTeamMembers(user!.id)
	};
};

export const functions = {
	getHeaderContainer,
	getUserInfo
};
