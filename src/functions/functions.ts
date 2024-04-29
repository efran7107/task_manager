import { Requests } from "@/api/api";
import { Team, TeamMember, TeamMemberTeamsLink } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getUserTeams = async (userId: number) => {
  const teamLinks = await Requests.getUsersTeamLinks(userId).then((links) =>
    links.map((link) => link.teamId)
  );
  const teams: Team[] = [];
  for (const teamId of teamLinks) {
    const team = await Requests.getTeamById(teamId).then((team) => team);
    teams.push(...team);
  }
  return teams;
};

const getUserTeamMembers = async (userId: number) => {
  const userTeams = (await getUserTeams(userId)).map((team) => team.id);

  const teamMembersLinks: Array<TeamMemberTeamsLink[]> = [];
  for (const teamId of userTeams) {
    const teamMembers = await Requests.getTeamTeamLinks(teamId).then(
      (members) => members
    );
    teamMembersLinks.push(teamMembers);
  }
  const teamMembers: Array<TeamMember[]> = [];
  for (const team of teamMembersLinks) {
    const userTeam: TeamMember[] = [];
    for (const link of team) {
      const teamMember = await Requests.getUserById(link.teamMemberId);
      userTeam.push(...teamMember);
    }
    teamMembers.push(userTeam);
  }

  return teamMembers;
};

const getUserInfo = async (user: TeamMember) => {
  return {
    user: user,
    team: await getUserTeams(user.id),
    teamMembers: await getUserTeamMembers(user.id),
  };
};

export const functions = {
  getHeaderContainer,
  getUserInfo,
};
