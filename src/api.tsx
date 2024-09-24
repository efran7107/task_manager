import {
  Note,
  Tag,
  TaggedTask,
  Task,
  Team,
  TeamMemberLink,
  User,
  UserAuth,
  UserTask,
} from "./types/objectTypes";

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

const postRequestsOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export const PostRequests = {
  createTeam: (newTeam: Omit<Team, "id">): Promise<Team> => {
    return fetch(`${baseUrl}/teams`, {
      ...postRequestsOptions,
      body: JSON.stringify(newTeam),
    }).then((res) => res.json());
  },
  createUser: (newUser: Omit<User, "id">): Promise<User> => {
    return fetch(`${baseUrl}/users`, {
      ...postRequestsOptions,
      body: JSON.stringify(newUser),
    }).then((res) => res.json());
  },
  createTeamMemberLink: (
    newTeamMemberLink: Omit<TeamMemberLink, "id">
  ): Promise<TeamMemberLink> => {
    return fetch(`${baseUrl}/teamMemberLinks`, {
      ...postRequestsOptions,
      body: JSON.stringify(newTeamMemberLink),
    }).then((res) => res.json());
  },
  createUserAuth: (newAuth: Omit<UserAuth, "id">) => {
    return fetch(`${baseUrl}/userAuths`, {
      ...postRequestsOptions,
      body: JSON.stringify(newAuth),
    });
  },
  addTask: (newTask: Omit<Task, "id">): Promise<Task> => {
    return fetch(`${baseUrl}/tasks`, {
      ...postRequestsOptions,
      body: JSON.stringify(newTask),
    }).then((res) => res.json());
  },
  addUserTask: (newUserTask: Omit<UserTask, "id">) => {
    return fetch(`${baseUrl}/usersTasks`, {
      ...postRequestsOptions,
      body: JSON.stringify(newUserTask),
    });
  },
  addTag: (newTag: Omit<Tag, "id">): Promise<Tag> => {
    return fetch(`${baseUrl}/tags`, {
      ...postRequestsOptions,
      body: JSON.stringify(newTag),
    }).then((res) => res.json());
  },
  addTaggedTask: (newTaggedTask: Omit<TaggedTask, "id">) => {
    return fetch(`${baseUrl}/taggedTasks`, {
      ...postRequestsOptions,
      body: JSON.stringify(newTaggedTask),
    });
  },
  addNote: (newNote: Omit<Note, "id">): Promise<Note> => {
    return fetch(`${baseUrl}/notes`, {
      ...postRequestsOptions,
      body: JSON.stringify(newNote),
    }).then((res) => res.json());
  },
};
