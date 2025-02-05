import { apiOptions } from "../api";
import {
  TMemTeamLink,
  TPage,
  TTeam,
  TTeamAuth,
  TTeamMember,
} from "../types/globalTypes";
import { SignUpInput } from "../types/logInProviderTypes";
import {Team} from "../components/classes/team.ts";
import {User} from "../components/classes/user.ts";

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
  const user: TTeamMember = await apiOptions.getRequests.getSingleData('teamMembers', 'username', username)
  const teams: TTeam[] = await  apiOptions.getRequests.getDataInfo('teams')
  const memTeams = await apiOptions.getRequests.getFilteredData('memTeamLinks', 'userId', user.id)
      .then((links:TMemTeamLink[]) =>
          links
              .map(link => teams.find(team => team.id === link.teamId)!)
              .map(team => new Team(team))
      )
  const userData = {
    user: new User(user),
    teams: memTeams
  }
  if(
      memTeams
          .filter((team) =>
            team.getTeamLeader().getUserId() === user.id).length > 0
  )
    return {...userData, activeTeam: memTeams.filter((team) => team.getTeamLeader().getUserId() === user.id)[0]}
  else return {...userData, activeTeam: memTeams[0]}
}
