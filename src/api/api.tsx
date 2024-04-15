import { TeamMember, TeamMemberAuth } from "@/types/types";

const baseUrl = "http://localhost:3000";

const registerUser = (newUser: Omit<TeamMember, "teamMemberId">) => {
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
};
