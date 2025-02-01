import { ComponentProps } from "react";

export type UserInputProp = ComponentProps<"input">;

export type TPage = 'log-in' | "home-page" | "create/join-team" | 'loading';

export type TAllData = {
    teams: TTeam[];
    teamMembers: TTeamMember[];
    userAuths: TUserAuth[];
    memTeamLinks: TMemTeamLink[];
}

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