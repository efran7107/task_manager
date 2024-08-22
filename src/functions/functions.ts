import {
  Task,
  Team,
  TeamMemberLink,
  TeamProfile,
  User,
  UserTask,
} from "../types/objectTypes";

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
): Array<TeamProfile> => {
  const userTeamLinks = teamMemberLinks.filter(
    (link) => link.userId === user.id
  );
  const userTeams: Team[] = [];
  userTeamLinks.forEach((link) => {
    const team = teams.find((team) => team.id === link.teamId)!;
    userTeams.push(team);
  });

  const userTeamProfiles = userTeams.map((team) => {
    const userTeamMembersLinks = teamMemberLinks.filter(
      (link) => link.teamId === team.id
    );
    const teamMembers: User[] = [];
    userTeamMembersLinks.forEach((link) => {
      const linkedUser = users.filter(
        (teamMember) => teamMember.id === link.userId
      )[0];
      teamMembers.sort((curUser, nxtUser) => {
        return curUser.id === team.teamLeadId
          ? -1
          : nxtUser.id === team.teamLeadId
          ? 1
          : 0;
      });
      teamMembers.push(linkedUser);
    });
    return {
      team: team,
      teamMembers: teamMembers,
    };
  });

  return userTeamProfiles;
};

const getUserTasks = (
  userId: number,
  teamId: number,
  tasks: Task[],
  userTasks: UserTask[]
) => {
  const activeTaskLinks = userTasks.filter(
    (link) => link.teamId === teamId && link.userId === userId
  );
  const activeTasks = [];
  for (const link of activeTaskLinks) {
    const task = tasks.find((task) => task.id === link.taskId)!;
    activeTasks.push(task);
  }

  return activeTasks;
};

export const functions = {
  logInUser,
  createUser,
  getTeamMemberInfo,
  getUserTasks,
};
