import toast from "react-hot-toast";
import { TMemTeamLink, TPage, TTeam } from "../types/globalTypes";

export const sendError = (setPage: (page: TPage) => void) => {
  toast.error("Please fill out the form to create an account.");
  setPage("log-in");
};

export const convertCamelToLabel = (label: string) => {
  const convert = label.replace(/([A-Z])/g, " $1");
  return convert.charAt(0).toUpperCase() + convert.slice(1);
};

export const getUserTeams = (
  memTeamLinks: TMemTeamLink[],
  teams: TTeam[],
  userId: number
) => {
  const userLinks = memTeamLinks.filter((link) => link.userId === userId);
  const userTeams = userLinks.map((link) =>
    teams.find((team) => team.id === link.teamId)
  );
  console.log(userTeams);
};
