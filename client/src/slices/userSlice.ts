import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, SetCheckingPayload, SetIsAuthPayload } from "../types/types";
import { logoutThunk } from "./asyncActions";

const UserInitialState: IUser = {
	checking: true,
	isAuth: false,
};

const userSlice = createSlice({
	name: "user",
	initialState: UserInitialState,
	reducers: {
		setChecking: (state, { payload }: PayloadAction<SetCheckingPayload>) => {
			state.checking = payload;
		},
		setIsAuth: (state, { payload }: PayloadAction<SetIsAuthPayload>) => {
			state.isAuth = payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logoutThunk.fulfilled, (state) => {
			state.isAuth = false;
		});
	},
});

export const { setChecking, setIsAuth } = userSlice.actions;

export const Logout = logoutThunk;

export const UserReducer = userSlice.reducer;
