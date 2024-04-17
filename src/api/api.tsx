import { TeamMember, TeamMemberAuth } from "@/types/types";

const baseUrl = "http://localhost:3000";

const getAllUsers = (): Promise<TeamMember[]> => {
  return fetch(`${baseUrl}/teamMembers`).then((res) => res.json());
};

const getUserPassword = (teamMemberId: number) => {
  return fetch(`${baseUrl}/teamMemberAuth/${teamMemberId}`).then((res) =>
    res.json()
  );
};

const registerUser = (newUser: Omit<TeamMember, "id">) => {
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

export const Requests = {
  registerUser,
  registerUserAuth,
  getAllUsers,
  getUserPassword,
};
