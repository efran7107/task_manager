const baseUrl = "http://localhost:3000";

export const GetRequests = {
  getTeams: () => {
    return fetch(`${baseUrl}/teams`).then((res) => res.json());
  },
  getUsers: () => {
    return fetch(`${baseUrl}/users`).then((res) => res.json());
  },
  getUsersByUsername: (username: string) => {
    return fetch(`${baseUrl}/users?username=${username}`).then((res) =>
      res.json()
    );
  },
  getUserAuth: (userId: number) => {
    return fetch(`${baseUrl}/userAuths?userId=${userId}`).then((res) =>
      res.json()
    );
  },
  getTeamMemberLinks: () => {
    return fetch(`${baseUrl}/teamMemberLinks`).then((res) => res.json());
  },
  getTasks: () => {
    return fetch(`${baseUrl}/tasks`).then((res) => res.json());
  },
  getUsersTasks: () => {
    return fetch(`${baseUrl}/usersTasks`).then((res) => res.json());
  },
  getTags: () => {
    return fetch(`${baseUrl}/tags`).then((res) => res.json());
  },
  getTaggedTasks: () => {
    return fetch(`${baseUrl}/taggedTasks`).then((res) => res.json());
  },
  getNotes: () => {
    return fetch(`${baseUrl}/notes`).then((res) => res.json());
  },
};
