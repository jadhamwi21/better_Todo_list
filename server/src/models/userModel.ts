import { Schema, model, Model, Mongoose } from "mongoose";
import { IUser } from "../types/types";

export const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	refresh_tokens_blacklist: {
		type: [String],
		required: true,
	},
	is_blocked: {
		type: Boolean,
		required: true,
	},
	lists: {
		type: [
			{
				listName: String,
				Todos: [
					{
						name: String,
						status: String,
					},
				],
			},
		],
		required: true,
	},
});

export const User: Model<IUser> = model("User", UserSchema);
