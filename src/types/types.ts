export type Team = {
	teamId: number;
	teamName: string;
	teamLeaderId: number;
};

export type TeamMember = {
	teamMemberId: number;
	name: string;
	email: string;
};

export type TeamMemberAuth = {
	teamMemberId: number;
	password: string;
};

export type TeamMemberTeamsLink = {
	TeamMemberId: number;
	TeamId: number;
};

export type Status = 'to-do' | 'doing' | 'done';

export type Task = {
	taskId: number;
	taskName: string;
	description: string;
	status: Status;
	dueDate: Date;
	isImportant: boolean;
};

export type TaskAssinmentLink = {
	taskAssignmentID: number;
	taskId: number;
};

export type Tag = {
	tagId: number;
	TagName: string;
};

export type TaskTagLink = {
	taskID: number;
	tagId: number;
};

export type Notes = {
	noteId: number;
	content: string;
	TeamMemberId: number;
	TaskId: number;
};
