import bcrypt from "bcrypt";
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { RefreshKey, SecretKey } from "../constants/constants";
import { User } from "../models/userModel";
import {
	Lists,
	Todo,
	TokenBlacklistCheckReturnType,
	Tokens,
	VerifyRefreshTokenPromiseType,
} from "../types/types";
export const HashPassword = async (plainPassword: string): Promise<string> => {
	const RoundFactor = 10;
	return new Promise((resolve, reject) => {
		bcrypt.hash(plainPassword, RoundFactor, (err, hashedPassword) => {
			if (err) {
				reject(err);
			} else {
				resolve(hashedPassword);
			}
		});
	});
};
export const SetUserBlock = async (username: string, blockType: boolean) => {
	return await User.findOneAndUpdate({ username }, { is_blocked: blockType });
};

export const MatchPassword = async (
	plainPassword: string,
	hashedPassword: string
): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		bcrypt
			.compare(plainPassword, hashedPassword)
			.then((match) => {
				resolve(match);
			})
			.catch((reason) => {
				reject(reason);
			});
	});
};

export const CheckIfTokenInBlacklist = async (
	username: string,
	token: string
): Promise<TokenBlacklistCheckReturnType> => {
	const user = await User.findOne({ username });
	return user?.refresh_tokens_blacklist.indexOf(token) !== -1
		? "blacklisted"
		: "not_blacklisted";
};

export const VerifyAccessToken = async (token: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SecretKey, (err, decoded: any) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(decoded.username);
			}
		});
	});
};

export const VerifyRefreshToken = async (
	token: string
): Promise<VerifyRefreshTokenPromiseType> => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, RefreshKey, async (err, { username }: any) => {
			const BlacklistResponse = await CheckIfTokenInBlacklist(username, token);
			if (BlacklistResponse === "blacklisted") {
				await SetUserBlock(username, true);
				reject("The account has been blocked");
			} else if (err) {
				reject(err.message);
			} else {
				const newAccessToken = jwt.sign({ username }, SecretKey, {
					expiresIn: 60 * 10,
				});
				const newRefreshToken = jwt.sign({ username: username }, RefreshKey, {
					expiresIn: 60 * 24 * 365 * 2,
				});
				resolve({
					new_access_token: newAccessToken,
					new_refresh_token: newRefreshToken,
					username: username,
				});
			}
		});
	});
};

export const AttachAccessTokenAndRefreshTokenToResponse = (
	res: Response,
	tokens: Tokens
) => {
	return res
		.cookie("access_token", tokens.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		})
		.cookie("refresh_token", tokens.refresh_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
		});
};

export const ClearAccessTokenAndRefreshTokenFromClient = (res: Response) => {
	return res.clearCookie("access_token").clearCookie("refresh_token");
};

export const AddRefreshTokenToBlacklist = async (
	username: string,
	token: string
) => {
	return await User.findOneAndUpdate(
		{
			username,
		},
		{
			$push: { refresh_tokens_blacklist: token },
		}
	);
};

export const Capitalize = (str: string): string => str.toUpperCase();

export const CheckListExistance = (lists: Lists, listName: string) => {
	return (
		lists.map((list) => Capitalize(list.listName)).indexOf(listName) !== -1
	);
};

export const GetTodosOfThisList = (lists: Lists, listName: string) => {
	const [targetList] = lists.filter((list) => list.listName == listName);
	console.log("TARGET LIST", targetList);
	return targetList.Todos;
};

export const CheckTodoExistance = (
	lists: Lists,
	listName: string,
	todoName: string
) => {
	const Todos = GetTodosOfThisList(lists, listName);
	console.log(Todos);
	return Todos.map((todo) => todo.name).indexOf(todoName) !== -1;
};

export const GetIndexOfList = (lists: Lists, listName: string) => {
	for (let i = 0; i < lists.length; i++) {
		if (lists[i].listName === listName) {
			return i;
		}
	}
	return -1;
};

export const GetIndexOfTodo = (list: Todo[], todoName: string) => {
	for (let i = 0; i < list.length; i++) {
		if (list[i].name === todoName) {
			return i;
		}
	}
	return -1;
};
