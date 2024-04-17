export type Team = {
  id: number;
  teamName: string;
  teamLeaderId: number;
};

export type TeamMember = {
  id: number;
  username: string;
  name: string;
  email: string;
};

export type TeamMemberAuth = {
  id: number;
  teamMemberId: number;
  password: string;
};

export type TeamMemberTeamsLink = {
  id: number;
  TeamMemberId: number;
  TeamId: number;
};

export type Status = "to-do" | "doing" | "done";

export type Task = {
  id: number;
  taskName: string;
  description: string;
  status: Status;
  dueDate: Date;
  isImportant: boolean;
};

export type TaskAssinmentLink = {
  id: number;
  teamMemberId: number;
  taskId: number;
};

export type Tag = {
  id: number;
  tagId: number;
  TagName: string;
};

export type TaskTagLink = {
  id: number;
  taskID: number;
  tagId: number;
};

export type Notes = {
  id: number;
  noteId: number;
  content: string;
  TeamMemberId: number;
  TaskId: number;
};
