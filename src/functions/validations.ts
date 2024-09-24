import toast from "react-hot-toast";
import { Task, Team, User } from "../types/objectTypes";

const isValidName = (inputStr: string) => {
  return /([a-zA-Z]|-)+$/.test(inputStr) || inputStr.trim() === "";
};

const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("user") === null ? false : true;
};

const isValidLogIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): boolean => {
  return username !== "" && password !== "" ? true : false;
};

const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

const isSameUsername = (username: string, allUsers: User[]): boolean => {
  return allUsers.some((user) => username === user.username);
};

const isSameTeamName = (teamName: string, allTeams: Team[]) => {
  return allTeams.some((team) => teamName === team.teamName);
};

const isValidSignUp = (
  signUpForm: {
    firstName: string;
    lastName: string;
    email: string;
    newUsername: string;
    newPassword: string;
    confirm: string;
  },
  allUsers: User[],
  createTeam: {
    teamName: string;
    teamCode: string;
  },
  joinTeam: { joinTeamName: string; joinTeamCode: string },
  teams: Team[]
): boolean => {
  const { firstName, lastName, email, newUsername, newPassword, confirm } =
    signUpForm;

  const { teamName, teamCode } = createTeam;
  const { joinTeamName, joinTeamCode } = joinTeam;

  if (
    firstName.trim().length > 2 &&
    lastName.trim().length > 2 &&
    isValidEmail(email) &&
    !isSameUsername(newUsername, allUsers) &&
    newPassword === confirm
  ) {
    if (
      (joinTeamName.trim().length > 2 && joinTeamCode.trim().length > 2) ||
      (teamName.trim().length > 2 && teamCode.trim().length > 2)
    ) {
      if (joinTeamName.trim().length > 2 && joinTeamCode.trim().length > 2) {
        if (!isSameTeamName(joinTeamName, teams)) {
          toast.error("please enter a valid team name");
          return false;
        } else {
          const team = teams.find((team) => team.teamName === joinTeamName)!;
          if (team.teamCode !== joinTeamCode) {
            toast.error("please enter a right passcode for the team");
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (isSameTeamName(teamName, teams)) {
          toast.error("please enter a different team name");
          return false;
        } else {
          return true;
        }
      }
    }
  }
  return false;
};

const isValidTask = (newTask: Omit<Task, "id">) => {
  const { title, desc, dueDate } = newTask;
  return title.trim() !== "" && desc.trim() !== "" && dueDate.trim() !== "";
};

export const validations = {
  isUserLoggedIn,
  isValidLogIn,
  isValidSignUp,
  isValidEmail,
  isSameUsername,
  isSameTeamName,
  isValidName,
  isValidTask,
};
