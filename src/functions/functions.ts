import { TeamMember } from "@/types/types";

const getHeaderContainer = () => {
  const headerContainer = document.getElementById("header");
  headerContainer?.classList.add("dashboard");
  headerContainer?.children[0].classList.add("dashboard");
};

const getUserInfo = async (user: TeamMember) => {
  return {};
};

export const functions = {
  getHeaderContainer,
  getUserInfo,
};
