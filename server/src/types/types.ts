export type PortType = string | number;

export type TodoStatus = "completed" | "in progress";

export interface Todo {
	name: string;
	status: TodoStatus;
}

export type Lists = { listName: string; Todos: Todo[] }[];

export interface IUser {
	username: string;
	password: string;
	refresh_tokens_blacklist: string[];
	is_blocked: boolean;
	lists: Lists;
}

export interface VerifyRefreshTokenPromiseType {
	new_access_token: string;
	new_refresh_token: string;
	username: string;
}
export interface Tokens {
	access_token: string;
	refresh_token: string;
}

export type TokenBlacklistCheckReturnType = "blacklisted" | "not_blacklisted";
