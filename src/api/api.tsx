import {
  Note,
  Tag,
  Task,
  TaskAssinmentLink,
  TaskTagLink,
  Team,
  TeamMember,
  TeamMemberAuth,
  TeamMemberTeamsLink,
} from "@/types/types";

const baseUrl = "http://localhost:3000";

export const GetRequests = {
  getAllUsers: (): Promise<TeamMember[]> => {
    return fetch(`${baseUrl}/teamMembers`).then((res) => res.json());
  },
  getAllTeams: (): Promise<Team[]> => {
    return fetch(`${baseUrl}/teams`).then((res) => res.json());
  },
  getAllTeamMemeberLinks: (): Promise<TeamMemberTeamsLink[]> => {
    return fetch(`${baseUrl}/teamMemberTeamsLink`).then((res) => res.json());
  },
  getAllTasks: (): Promise<Task[]> => {
    return fetch(`${baseUrl}/tasks`).then((res) => res.json());
  },
  getAllTaskCreaters: (): Promise<TaskAssinmentLink[]> => {
    return fetch(`${baseUrl}/taskCreater`).then((res) => res.json());
  },
  getAllTaskAssignmentLinks: (): Promise<TaskAssinmentLink[]> => {
    return fetch(`${baseUrl}/taskAssignmentLink`).then((res) => res.json());
  },
  getAllTags: (): Promise<Tag[]> => {
    return fetch(`${baseUrl}/tags`).then((res) => res.json());
  },
  getAllTaskTagLinks: (): Promise<TaskTagLink[]> => {
    return fetch(`${baseUrl}/taskTagLink`).then((res) => res.json());
  },
  getAllNotes: (): Promise<Note[]> => {
    return fetch(`${baseUrl}/notes`).then((res) => res.json());
  },
  getUserPassword: (teamMemberId: number) => {
    return fetch(`${baseUrl}/teamMemberAuth/${teamMemberId}`).then((res) =>
      res.json()
    );
  },
  getUserByUsername: (username: string): Promise<TeamMember[]> => {
    return fetch(`${baseUrl}/teamMembers?username=${username}`).then((res) =>
      res.json()
    );
  },
};

export const PostRequests = {
  registerUser: (newUser: Omit<TeamMember, "id">): Promise<TeamMember> => {
    return fetch(`${baseUrl}/teamMembers`, {
      body: JSON.stringify(newUser),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  },
  registerUserAuth: (userPassword: Omit<TeamMemberAuth, "id">) => {
    return fetch(`${baseUrl}/teamMemberAuth`, {
      body: JSON.stringify(userPassword),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
  },
  postNewTag: (tag: Omit<Tag, "id">): Promise<Tag> => {
    return fetch(`${baseUrl}/tags`, {
      body: JSON.stringify(tag),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
  },
  postTaskTagLink: (taskTaglink: Omit<TaskTagLink, "id">) => {
    return fetch(`${baseUrl}/taskTagLink`, {
      body: JSON.stringify(taskTaglink),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
  },
  postNewNote: (note: Omit<Note, "id">) => {
    return fetch(`${baseUrl}/notes`, {
      body: JSON.stringify(note),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
  },
};

export const DeleteRequests = {
  deleteTask: (taskId: number) => {
    return fetch(`${baseUrl}/tasks/${taskId}`, {
      method: "DELETE",
    });
  },
  deleteTaskAssignmentLink: (linkId: number) => {
    return fetch(`${baseUrl}/taskAssignmentLink/${linkId}`, {
      method: "DELETE",
    });
  },
  deleteTaskTagLink: (linkId: number) => {
    return fetch(`${baseUrl}/taskTagLink/${linkId}`, {
      method: "DELETE",
    });
  },
  deleteTag: (tagId: number) => {
    return fetch(`${baseUrl}/tags/${tagId}`, {
      method: "DELETE",
    });
  },
  deleteNote: (noteId: number) => {
    return fetch(`${baseUrl}/notes/${noteId}`, {
      method: "DELETE",
    });
  },
};
