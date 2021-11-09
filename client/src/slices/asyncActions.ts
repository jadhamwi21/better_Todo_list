import { createAsyncThunk } from "@reduxjs/toolkit";
import {} from "redux";
import axios from "axios";
import { ApiEndpoint } from "../constants/constants";
import { IState } from "../store/store";
import {
	AddTodoPayloadType,
	ChangeTodoStatusPayloadType,
	DeleteTodoPayloadType,
	Lists,
} from "../types/types";

export const addListThunk = createAsyncThunk(
	"list/addList",
	async (listName: string, thunkAPI): Promise<string> => {
		return new Promise((resolve, reject) =>
			axios
				.post(
					`${ApiEndpoint}/user/list/add_list`,
					{
						ListName: listName,
					},
					{
						withCredentials: true,
					}
				)
				.then(() => {
					resolve(listName);
				})
				.catch((e) => {
					reject(e);
				})
		);
	}
);

export const deleteListThunk = createAsyncThunk(
	"list/deleteList",
	async (listName: string, thunkAPI): Promise<string> => {
		return new Promise((resolve, reject) => {
			axios
				.delete(`${ApiEndpoint}/user/list/delete_list`, {
					withCredentials: true,
					data: {
						ListName: listName,
					},
				})
				.then(() => {
					resolve(listName);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
);
export const fetchListsAndTodosThunk = createAsyncThunk(
	"list/fetch",
	async (): Promise<Lists> => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${ApiEndpoint}/user/list/get_lists`, { withCredentials: true })
				.then((res: any) => {
					const Lists = res.data.lists as Lists;
					resolve(Lists);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
);
export const addTodoThunk = createAsyncThunk(
	"todo/add",
	async (
		args: AddTodoPayloadType,
		thunkAPI: any
	): Promise<AddTodoPayloadType> => {
		return new Promise((resolve, reject) => {
			axios
				.post(
					`${ApiEndpoint}/user/todo/add`,
					{
						ListName: args.listName,
						TodoName: args.todoName,
					},
					{ withCredentials: true }
				)
				.then(() => {
					resolve(args);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
);

export const deleteTodoThunk = createAsyncThunk(
	"todo/delete",
	async (
		args: DeleteTodoPayloadType,
		thunkAPI
	): Promise<DeleteTodoPayloadType> => {
		return new Promise((resolve, reject) =>
			axios
				.delete(`${ApiEndpoint}/user/todo/delete`, {
					withCredentials: true,
					data: {
						ListName: args.listName,
						TodoName: args.todoName,
					},
				})
				.then((res) => {
					resolve(args);
				})
				.catch((e) => {
					reject(e);
				})
		);
	}
);

export const changeTodoStatusThunk = createAsyncThunk(
	"todo/change_status",
	async (
		{ todoName, todoStatus, listName }: ChangeTodoStatusPayloadType,
		thunkAPI
	): Promise<ChangeTodoStatusPayloadType> => {
		return new Promise((resolve, reject) => {
			axios
				.put(
					`${ApiEndpoint}/user/todo/change`,
					{
						TodoName: todoName,
						TodoStatus: todoStatus,
						ListName: listName,
					},
					{ withCredentials: true }
				)
				.then(() => {
					resolve({ todoName, todoStatus, listName });
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
);

export const logoutThunk = createAsyncThunk(
	"user/logout",
	async (args, thunkApi): Promise<any> => {
		return new Promise((resolve, reject) => {
			axios
				.post(`${ApiEndpoint}/user/auth/logout`, {}, { withCredentials: true })
				.then((res) => {
					resolve(res.data);
				})
				.catch((e) => {
					reject(e);
				});
		});
	}
);
