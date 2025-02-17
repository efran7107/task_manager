import { apiOptions } from "../api";
import {
  TMemTeamLink, TNote,
  TTask, TTaskLink,
  TTeam,
  TTeamAuth,
  TTeamMember,
} from "../types/globalTypes";
import { SignUpInput } from "../types/logInProviderTypes";
import {Team} from "../classes/Team.ts";
import {User} from "../classes/User.ts";
import {Task} from "../classes/Task.ts";
import toast from "react-hot-toast";

export const addUser = async (newUser: SignUpInput) => {
  const { username, firstName, lastName, email, password } = newUser;
  const userName =
    firstName.charAt(0).toUpperCase() +
    firstName.slice(1).toLowerCase() +
    " " +
    lastName.charAt(0).toUpperCase() +
    lastName.slice(1).toLowerCase();
  const tempUser = {
    name: userName,
    email: email,
    username: username,
  };
  const user: TTeamMember = await apiOptions.postRequests.addData(
    "teamMembers",
    tempUser
  );
  const tempUserAuth = {
    userId: user.id,
    password: password,
  };
  apiOptions.postRequests.addData("userAuths", tempUserAuth);
};

export const checkUserTeam = async (username: string): Promise<boolean> => {
  const user = await apiOptions.getRequests.getSingleData(
    "teamMembers",
    "username",
    username
  );
  const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo(
    "memTeamLinks"
  );
  const userTeamLinks = memTeamLinks.filter((link) => link.userId === user.id);
  return userTeamLinks.length > 0;
};

export const isInTeam = async (userId: number, teamId: number) => {
  const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getMultipleFilterData('memTeamLinks', 'userId', userId, 'teamId', teamId)
  return memTeamLinks.length > 0
}

export const varifyTeam = async (joinTeam: {
  teamName: string;
  auth: string;
}): Promise<boolean> => {
  const team: TTeam = await apiOptions.getRequests.getSingleData(
    "teams",
    "name",
    joinTeam.teamName
  );
  if (team === undefined) return false;

  const teamAuth: TTeamAuth = await apiOptions.getRequests.getSingleData(
    "teamAuths",
    "teamId",
    team.id.toString()
  );
  if (teamAuth.auth === joinTeam.auth) return true;
  else return false;
};

export const validateTeamName = async (newTeam: {
  teamName: string;
  auth: string;
  confirm: string;
}) => {
  const { teamName, auth, confirm } = newTeam;
  const team = await apiOptions.getRequests.getSingleData(
    "teams",
    "name",
    teamName
  );
  if (team) return false;
  if (auth !== confirm) return false;
  return true;
};

export const addUserToTeam = async (joinTeam: {
  teamName: string;
  auth: string;
}) => {
  const team: TTeam = await apiOptions.getRequests.getSingleData(
    "teams",
    "name",
    joinTeam.teamName
  );
  const newMemNumberObj = { numOfMembers: team.numOfMembers + 1 };
  const user: TTeamMember = await apiOptions.getRequests.getSingleData(
    "teamMembers",
    "username",
    localStorage.getItem("username")!
  );
  const newMemTeamLink: Omit<TMemTeamLink, "id"> = {
    userId: user.id,
    teamId: team.id,
  };
  await apiOptions.postRequests.addData("memTeamLinks", newMemTeamLink);
  await apiOptions.patchRequests.editData("teams", newMemNumberObj, team.id);
};

export const createNewTeam = async (createTeam: {
  teamName: string;
  auth: string;
  confirm: string;
}) => {
  const user: TTeamMember = await apiOptions.getRequests.getSingleData(
    "teamMembers",
    "username",
    localStorage.getItem("username")!
  );
  const tempTeam: Omit<TTeam, "id"> = {
    name: createTeam.teamName,
    teamLeadId: user.id,
    numOfMembers: 1,
  };
  const newTeam: TTeam = await apiOptions.postRequests.addData(
    "teams",
    tempTeam
  );
  const tempTeamAuth: Omit<TTeamAuth, "id"> = {
    teamId: newTeam.id,
    auth: createTeam.auth,
  };
  const tempMemTeamLink: Omit<TMemTeamLink, "id"> = {
    userId: user.id,
    teamId: newTeam.id,
  };

  await apiOptions.postRequests.addData("teamAuths", tempTeamAuth);
  await apiOptions.postRequests.addData("memTeamLinks", tempMemTeamLink);
};

const getTeamTasks = async (teamId: number) => {
  const teamTasks: TTask[] = await apiOptions.getRequests.getFilteredData('tasks', 'teamId', teamId)
  const taskClasses: Task[] = []
  for(const task of teamTasks){
    const taskLinks: TTaskLink[] = await apiOptions.getRequests.getFilteredData('taskLinks', 'taskId', task.id)
    const notes = await apiOptions.getRequests.getFilteredData('notes', 'taskId', task.id)
    taskClasses.push(new Task(task, notes, taskLinks.map(link => link.teamMemberId)))
  }
  return taskClasses
}

export const getUserData = async (username: string) => {
  const teamMember: TTeamMember = await apiOptions.getRequests.getSingleData('teamMembers', 'username', username)
  const teams: TTeam[] = await  apiOptions.getRequests.getDataInfo('teams')
  const users: TTeamMember[] = await  apiOptions.getRequests.getDataInfo('teamMembers')
  const teamMemberLinks: TMemTeamLink[] = await apiOptions.getRequests.getFilteredData('memTeamLinks', 'userId', teamMember.id)
  const allTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo('memTeamLinks')
  const allTaskLinks: TTaskLink[] = await apiOptions.getRequests.getDataInfo('taskLinks')
  const userTeams = teamMemberLinks.map(link => teams.find(team => team.id === link.teamId)!)
  
  const userTeamClasses: Team[] = []
  for(const team of userTeams){
    const teamUsers = allTeamLinks.filter(link => link.teamId === team.id)
      .map(link => {
        return new User(users.find(user => user.id === link.userId)!)
      })
    const memTaskLinks:TTaskLink[] = []
    for(const user of teamUsers){
      allTaskLinks.filter(link => link.teamMemberId === user.getId())
        .forEach(link => memTaskLinks.push(link))
    }
    const teamTasks = await getTeamTasks(team.id)
    userTeamClasses.push(new Team(team, teamUsers, teamTasks, memTaskLinks))
  }

  const userData = {user: new User(teamMember), userTeams: userTeamClasses}

  const isLeader = userTeamClasses.filter(team => team.getId() === teamMember.id).length > 0
  if (isLeader) return {...userData, activeTeam: userTeamClasses.filter(team => team.getId() === teamMember.id)[0]}
  return {...userData, activeTeam: userTeamClasses[0]}
}

export const addTask = async (
  task: Omit<TTask, 'id' | 'teamId'>,
  teamId: number,
  usersIds: number[],
  activeUserId: number,
  notes?: Omit<TNote, 'id' | 'taskId' | 'authId'>[]
) => {
  try{
    const createdTask: Omit<TTask, 'id'> = {
      ...task,
      teamId: teamId
    }
    const newTask: TTask = await apiOptions.postRequests.addData('tasks', createdTask)
    for (const id of usersIds) {
      const newTaskLink: Omit<TTaskLink, 'id'> = {
        taskId: newTask.id,
        teamMemberId: id
      }
      await apiOptions.postRequests.addData('taskLinks', newTaskLink)
    }
    if(notes) {
      for (const note of notes){
        const newNote: Omit<TNote, 'id'> = {
          ...note,
          taskId: newTask.id,
          authId: activeUserId
        }
        await apiOptions.postRequests.addData('notes', newNote)
      }
    }
  }
  catch (err){
    console.error(err)
    toast.error('sorry an error occured')
  }
  
}
