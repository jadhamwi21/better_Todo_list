import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	AddListPayloadType,
	AddTodoPayloadType,
	ChangeTodoStatusPayloadType,
	DeleteListPayloadType,
	DeleteTodoPayloadType,
	Lists,
	ListStateInterface,
	SelectListPayloadType,
} from "../types/types";
import { Capitalize } from "../utils/utils";
import {
	addListThunk,
	addTodoThunk,
	changeTodoStatusThunk,
	deleteListThunk,
	deleteTodoThunk,
	fetchListsAndTodosThunk,
} from "./asyncActions";

const initialState: ListStateInterface = {
	SelectedList: "",
	ListsWithTodos: {},
};

const listSlice = createSlice({
	name: "list",
	initialState,
	reducers: {
		selectList: (state, { payload }: PayloadAction<SelectListPayloadType>) => {
			state.SelectedList = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(
			addListThunk.fulfilled,
			(state, { payload }: PayloadAction<AddListPayloadType>) => {
				state.ListsWithTodos = {
					[Capitalize(payload)]: [],
					...state.ListsWithTodos,
				};
				state.SelectedList = Capitalize(payload);
			}
		);
		builder.addCase(
			deleteListThunk.fulfilled,
			(state, { payload }: PayloadAction<DeleteListPayloadType>) => {
				delete state.ListsWithTodos[payload];
				const ListNames = Object.keys(state.ListsWithTodos);
				if (ListNames.length) {
					state.SelectedList = ListNames[0];
				} else {
					state.SelectedList = "";
				}
			}
		);
		builder.addCase(
			fetchListsAndTodosThunk.fulfilled,
			(state, { payload }: PayloadAction<Lists>) => {
				state.ListsWithTodos = payload;
				state.SelectedList = Object.keys(payload)[0];
			}
		);
		builder.addCase(
			addTodoThunk.fulfilled,
			(state, { payload }: PayloadAction<AddTodoPayloadType>) => {
				state.ListsWithTodos[payload.listName].unshift({
					name: payload.todoName,
					status: "in progress",
				});
			}
		);
		builder.addCase(
			deleteTodoThunk.fulfilled,
			(state, { payload }: PayloadAction<DeleteTodoPayloadType>) => {
				state.ListsWithTodos[payload.listName] = state.ListsWithTodos[
					payload.listName
				].filter((todo) => todo.name !== payload.todoName);
			}
		);
		builder.addCase(
			changeTodoStatusThunk.fulfilled,
			(state, { payload }: PayloadAction<ChangeTodoStatusPayloadType>) => {
				state.ListsWithTodos[payload.listName] = state.ListsWithTodos[
					payload.listName
				].map((todo) => {
					if (todo.name === payload.todoName) {
						todo.status = payload.todoStatus;
					}
					return todo;
				});
			}
		);
	},
});

export const { selectList } = listSlice.actions;

export const addList = addListThunk;
export const deleteList = deleteListThunk;
export const fetchListsAndTodos = fetchListsAndTodosThunk;
export const addTodo = addTodoThunk;
export const deleteTodo = deleteTodoThunk;
export const changeTodoStatus = changeTodoStatusThunk;

export const ListReducer = listSlice.reducer;
