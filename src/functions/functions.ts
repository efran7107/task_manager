import { Requests } from "@/api/api";
import { Task, Team, TeamMember, TeamMemberTeamsLink } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getUserInfo = async (user: TeamMember | undefined) => {
  return {};
};

export const functions = {
  getHeaderContainer,
  getUserInfo,
};
