import {
  Team,
  TeamMember,
  TeamMemberAuth,
  TeamMemberTeamsLink,
} from "@/types/types";

const baseUrl = "http://localhost:3000";

const getAllUsers = (): Promise<TeamMember[]> => {
  return fetch(`${baseUrl}/teamMembers`).then((res) => res.json());
};

const getUserPassword = (teamMemberId: number) => {
  return fetch(`${baseUrl}/teamMemberAuth/${teamMemberId}`).then((res) =>
    res.json()
  );
};

const registerUser = (newUser: Omit<TeamMember, "id">): Promise<TeamMember> => {
  return fetch(`${baseUrl}/teamMembers`, {
    body: JSON.stringify(newUser),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

const registerUserAuth = (userPassword: Omit<TeamMemberAuth, "id">) => {
  return fetch(`${baseUrl}/teamMemberAuth`, {
    body: JSON.stringify(userPassword),
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  }).then((res) => res.json());
};

const getTeamById = (teamId: number): Promise<Team> => {
  return fetch(`${baseUrl}/teams/${teamId}`).then((res) => res.json());
};

const getTeamMemberById = (userId: number): Promise<TeamMember> => {
  return fetch(`${baseUrl}/teamMembers/${userId}`).then((res) => res.json());
};

const getUserTeamLink = (
  teamMemberId: number
): Promise<TeamMemberTeamsLink[]> => {
  return fetch(
    `${baseUrl}/teamMemberTeamsLink?teamMemberId=${teamMemberId}`
  ).then((res) => res.json());
};

const getUserTeamMembersTeamLinks = (teamId: number) => {
  return fetch(`${baseUrl}/teamMemberTeamsLink?teamId=${teamId}`).then((res) =>
    res.json()
  );
};

export const Requests = {
  registerUser,
  registerUserAuth,
  getAllUsers,
  getUserPassword,
  getTeamById,
  getTeamMemberById,
  getUserTeamLink,
  getUserTeamMembersTeamLinks,
};
