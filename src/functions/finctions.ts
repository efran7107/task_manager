import toast from "react-hot-toast";
import { TPage, TTeam } from "../types/globalTypes";

export const sendError = (setPage: (page: TPage) => void) => {
  toast.error("Please fill out the form to create an account.");
  setPage("log-in");
};

export const convertCamelToLabel = (label: string) => {
  const convert = label.replace(/([A-Z])/g, " $1");
  return convert.charAt(0).toUpperCase() + convert.slice(1);
};

export const findActiveTeam = (teams: TTeam[], userId: number) => {
  const userMadeTeams = teams.filter(team => team.teamLeadId === userId)
  if(userMadeTeams.length > 0) return userMadeTeams[0]
  return teams[0]
}
