import { apiOptions } from "../api";
import {
  TMemTeamLink,
  TPage,
  TTeam,
  TTeamAuth,
  TTeamMember,
} from "../types/globalTypes";
import { SignUpInput } from "../types/logInProviderTypes";

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

export const checkUserTeam = async (username: string): Promise<TPage> => {
  const user = await apiOptions.getRequests.getSingleData(
    "teamMembers",
    "username",
    username
  );
  const memTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo(
    "memTeamLinks"
  );
  const userTeamLinks = memTeamLinks.filter((link) => link.userId === user.id);
  return userTeamLinks.length > 0 ? "home-page" : "create/join-team";
};

export const varifyTeam = async (joinTeam: {
  teamName: string;
  auth: string;
}): Promise<boolean> => {
  const team: TTeam = await apiOptions.getRequests.getSingleData(
    "teams",
    "name",
    joinTeam.teamName
  );
  console.log(team);

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

export const getUserData = async (username: string) => {
  const teamMember: TTeamMember = await apiOptions.getRequests.getSingleData('teamMembers', 'username', username)
  const teams: TTeam[] = await  apiOptions.getRequests.getDataInfo('teams')
  const users: TTeamMember[] = await  apiOptions.getRequests.getDataInfo('teamMembers')
  const teamMemberLinks: TMemTeamLink[] = await apiOptions.getRequests.getFilteredData('memTeamLinks', 'userId', teamMember.id)
  const allTeamLinks: TMemTeamLink[] = await apiOptions.getRequests.getDataInfo('memTeamLinks')

  const userTeamsTeams = teamMemberLinks.map(link => teams.find(team => team.id === link.teamId)!)
  const userTeams: {team: TTeam, users: TTeamMember[]}[] = []
  for(const team of userTeamsTeams) {
    const teamLinks = allTeamLinks.filter(link => link.teamId === team.id)
    const teamUsers: TTeamMember[] = []
    for(const link of teamLinks) {
      teamUsers.push(users.find(user => user.id === link.userId)!)
    }
    userTeams.push({team: team, users: teamUsers})
  }

  const userData = {user: teamMember, userTeams: userTeams}

  const isLeader = userTeams.filter(team => team.team.id === teamMember.id).length > 0
  if (isLeader) return {...userData, activeTeam: userTeams.filter(team => team.team.id === teamMember.id)[0]}
  return {...userData, activeTeam: userTeams[0]}
}
