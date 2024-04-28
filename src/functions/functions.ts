import { Requests } from "@/api/api";
import { Task, Team, TeamMember, TeamMemberTeamsLink } from "@/types/types";

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

  for (const id of teamLinkIds) {
    Requests.getTeamById(id).then((team) => {
      userTeams.push(team);
    });
  }
  return userTeams;
};

const getUserTeamMembers = async (userId: number) => {
  const teamLinkIds = await Requests.getUserTeamLink(userId).then((links) =>
    links.map((link) => link.teamId)
  );
  const teamTeamMembersLinks: Array<TeamMemberTeamsLink[]> = [];
  for (const id of teamLinkIds) {
    teamTeamMembersLinks.push(await Requests.getUserTeamLinks(id));
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

const getUserTasks = async (userId: number) => {
  const taskAssignments = await Requests.getUserTaskLinks(userId).then(
    (links) => links.map((link) => link.taskId)
  );
  const userTasks: Task[] = [];
  taskAssignments.forEach(async (taskId) => {
    const task = await Requests.getTaskById(taskId);
    userTasks.push(...task);
  });

  return userTasks;
};

const getUserTags = async (userId: number) => {
  const taskAssignments = await Requests.getUserTaskLinks(userId).then(
    (links) => links.map((link) => link.taskId)
  );
  const userTasks: Task[] = [];
  taskAssignments.forEach(async (taskId) => {
    const task = await Requests.getTaskById(taskId);
    userTasks.push(...task);
  });

  console.log(userTasks);
};

const getUserInfo = async (user: TeamMember | undefined) => {
  return {
    user: user,
    team: await getUserTeam(user!.id),
    teamMembers: await getUserTeamMembers(user!.id),
    tasks: await getUserTasks(user!.id),
    tags: await getUserTags(user!.id),
  };
};

export const functions = {
  getHeaderContainer,
  getUserInfo,
};
