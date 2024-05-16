import { GetRequests } from "@/api/api";
import { AllData, Task, TaskAssinmentLink, Team, TeamMember, TeamMemberTeamsLink, TUserTeams } from "@/types/types";

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

const getTeamMembers = (teams: Team[], users: TeamMember[], userTeamLinks: TeamMemberTeamsLink[], userId: number): TUserTeams => {
  const userLinkIds = userTeamLinks.filter((link) => link.teamMemberId === userId).map(link => link.teamId)
  const userTeams: Team[] = []
  for(const id of userLinkIds) {
    userTeams.push(...teams.filter(team => team.id === id))
  }
    const teamUsersLinks = []
   for(const team of userTeams) {
    teamUsersLinks.push(userTeamLinks.filter(link => link.teamId === team!.id))
   }
   
   const teamUsers: TUserTeams = []
   for(const userSet of teamUsersLinks) {
    const team: {team: Team, users: TeamMember[]} = {
      team: userTeams[teamUsersLinks.indexOf(userSet)],
      users: [],
    }
     for(const link of userSet) {
     team.users.push(...users.filter(user => user.id === link.teamMemberId)) 
     }
     teamUsers.push(team)
   }

   return teamUsers
}

const getUserTasks = (tasks: Task[], taskAssignments: TaskAssinmentLink[], userId: number): Task[] => {
  const userTaskLinks = taskAssignments.filter(link => link.teamMemberId === userId)
  const userTasks: Task[] = []
  for(const link of userTaskLinks) {
    userTasks.push(...tasks.filter(task => task.id === link.taskId))
  }
  return userTasks  
}

const sortTasks = (tasks: Task[]) => {
  return tasks.sort((taskA, taskB) => {
    if (taskA.status === 'to-do' && taskB.status!== 'to-do') {
      return -1;
    } else if (taskA.status === 'doing' && taskB.status === 'done') {
      return -1;
    } else if (taskA.status === 'done' && taskB.status!== 'done') {
      return 1;
    } else if (taskA.status === taskB.status) {
      return 0;
    } else {
      return 1;
    }
  });
}

export const functions = {
  getHeaderContainer,
  getAllData,
  getTeamMembers,
  getUserTasks,
  sortTasks
};
