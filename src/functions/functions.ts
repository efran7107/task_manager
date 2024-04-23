import { Requests } from "@/api/api";
import { Team, TeamMember } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getUserTeam = async (userId: number) => {
  const teamLinkIds = await Requests.getUserTeamLink(userId).then((links) =>
    links.map((link) => link.teamId)
  );

  const userTeams: Team[] = [];

  for (let id of teamLinkIds) {
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
  const teamTeamMembers: TeamMember[][] = [];
  for (let id of teamLinkIds) {
    teamTeamMembers.push(await Requests.getUserTeamMembersTeamLinks(id));
  }
  return teamTeamMembers;
};

const getUserInfo = async (user: TeamMember | undefined) => {
  return {
    user: user,
    team: await getUserTeam(user!.id),
    teamMembers: await getuserTeamMembers(user!.id),
  };
};

export const functions = {
  getHeaderContainer,
  getUserInfo,
};
