import { ComponentProps } from "react";

export type Page =
  | "login/signup"
  | "loading"
  | "dashboard"
  | "add-task"
  | "error";

export type Team = {
  id: number;
  teamName: string;
  teamLeadId: number;
  teamCode: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
};

export type UserAuth = {
  id: number;
  userId: number;
  password: string;
};

export type TeamMemberLink = {
  id: number;
  userId: number;
  teamId: number;
};

export type Task = {
  id: number;
  title: string;
  desc: string;
  status: Page;
  dueDate: string;
  dateCreated: string;
  isUrgent: boolean;
  ucId: number;
};

export type UserTask = {
  id: number;
  userId: number;
  taskId: number;
};

export type Tag = {
  id: number;
  tag: string;
};

export type TaggedTask = {
  id: number;
  taskId: number;
  tagId: number;
};

export type Note = {
  id: number;
  title: string;
  desc: string;
  dateCreated: string;
  taskId: number;
};

export type AllData = {
  teams: Team[];
  users: User[];
  teamMemberLinks: TeamMemberLink[];
  tasks: Task[];
  usersTasks: UserTask[];
  tags: Tag[];
  taggedTasks: TaggedTask[];
  notes: Note[];
};

export type UserInputProp = ComponentProps<"input">;
