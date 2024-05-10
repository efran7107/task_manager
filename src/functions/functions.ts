import { GetRequests } from "@/api/api";
import { AllData, Team, TeamMember, TeamMemberTeamsLink } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getAllData = async (): Promise<AllData> => {
  const allData = {
    teams: await GetRequests.getAllTeams(),
    users: await GetRequests.getAllUsers(),
    userTeamLinks: await GetRequests.getAllTeamMemeberLinks(),
    tasks: await GetRequests.getAllTasks(),
    taskAssignments: await GetRequests.getAllTaskAssignmentLinks(),
    tags: await GetRequests.getAllTags(),
    taskTags: await GetRequests.getAllTaskTagLinks(),
    notes: await GetRequests.getAllNotes(),
  };
  return allData;
};

const getTeamMembers = (teams: Team[], users: TeamMember[], userTeamLinks: TeamMemberTeamsLink[], userId: number| undefined) => {
  const userLinkIds = userTeamLinks.filter((link) => link.teamMemberId === userId).map(link => link.teamId)
  const userTeams = []
  for(const id of userLinkIds) {
    userTeams.push(teams.find(team => team.id === id))
  }
    const teamUsersLinks = []
   for(const team of userTeams) {
    teamUsersLinks.push(userTeamLinks.filter(link => link.teamId === team!.id))
   }

   console.log(teamUsersLinks);
   
   const teamMembers = []
   
   

  
}

export const functions = {
  getHeaderContainer,
  getAllData,
  getTeamMembers
};
