import { Team, TeamMemberLink, User } from "../types/objectTypes";

const logInUser = (
  setUser: (user: User) => void,
  username?: string,
  allUsers?: User[],
  user?: User
) => {
  if (user !== undefined) {
    setUser(user);
    return;
  }
  const validUser = allUsers?.find((user) => user.username === username);
  setUser(validUser!);
};

const createUser = (newUserInfo: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}): Omit<User, "id"> => {
  const { firstName, lastName, email, username } = newUserInfo;
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
  };
};

const getTeamMemberInfo = (
  user: User,
  teams: Team[],
  teamMemberLinks: TeamMemberLink[],
  users: User[]
) => {
  const userTeamLinks = teamMemberLinks.filter(
    (link) => link.userId === user.id
  );
  const userTeams: Team[] = [];
  userTeamLinks.forEach((link) => {
    const team = teams.find((team) => team.id === link.teamId)!;
    userTeams.push(team);
  });

  const userTeamMembersLinks = [];

  userTeams.forEach((team) => {
    const teamTeamMembers = teamMemberLinks.filter(
      (link) => link.teamId === team.id
    );
  });

  const userInfo = {
    user: user,
    usersTeams: userTeams,
  };
  console.log(userInfo);
};

export const functions = {
  logInUser,
  createUser,
  getTeamMemberInfo,
};
