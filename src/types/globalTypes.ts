import { ComponentProps } from "react";

export type UserInputProp = ComponentProps<"input">;

export type TPage = 'log-in' | "home-page" | "create/join-team" | 'loading';

export type taskStatus = 'to-do' | 'doing' | 'done';

export type TTeam = {
    id: number;
    name: string;
    teamLeadId: number;
    numOfMembers: number;
}

export type TTeamAuth = {
    id: number;
    teamId: number;
    auth: string;
}

export type TTeamMember = {
    id: number;
    name: string;
    email: string;
    username: string;
}

export type TUserAuth = {
    id: number;
    userId: number;
    password: string;
}

export type TMemTeamLink = {
    id: number;
    userId: number;
    teamId: number;
}

export type TTask = {
    id: number;
    title: string;
    desc: string;
    isUrgent: boolean;
    author: string;
    status: taskStatus;
    creationDate: string;
    dueDate: string;
    teamId: number;
}

export type TTaskLink = {
    id: number;
    taskId: number;
    teamMemberId: number;

}

export type TNote = {
    id: number;
    title: string;
    desc: string;
    date: string;
    taskId: number;
    authId: number;
}