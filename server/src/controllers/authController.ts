import { Request, Response } from "express";
import { User } from "../models/userModel";
import { IUser } from "../types/types";
import {
	AddRefreshTokenToBlacklist,
	AttachAccessTokenAndRefreshTokenToResponse,
	ClearAccessTokenAndRefreshTokenFromClient,
	HashPassword,
	MatchPassword,
	VerifyRefreshToken,
} from "../utils/utils";
import jwt from "jsonwebtoken";
import { RefreshKey, SecretKey } from "../constants/constants";

export const UserSignup = async (req: Request, res: Response) => {
	const { username, password }: IUser = req.body;
	const userExists = await User.findOne({ username });
	if (userExists) {
		return res
			.status(409)
			.send({ success: false, message: "Username is taken", field: "username" })
			.end();
	}
	let HashedPassword;
	try {
		HashedPassword = await HashPassword(password);
	} catch (e) {
		return res.status(500).send({
			success: false,
			message: "some error occurred, try again later",
		});
	}

	const user = new User({
		username,
		password: HashedPassword,
		refresh_tokens_blacklist: [],
		is_blocked: false,
		lists: [],
	});

	user
		.save()
		.then(() => {
			return res
				.status(201)
				.send({ success: true, message: "signed up successfully" });
		})
		.catch(() => {
			return res.status(500).send({
				success: false,
				message: "some error occurred, try again later",
			});
		});
};

export const UserSignin = async (req: Request, res: Response) => {
	const { username, password }: IUser = req.body;
	const user = await User.findOne({ username });
	if (!user) {
		return res.status(404).send({ message: "Username doesn't exist" });
	}
	try {
		const { password: HashedPassword } = user;
		const match = await MatchPassword(password, HashedPassword);
		if (!match) {
			return res.status(401).send({ message: "Incorrect password" });
		}
	} catch (reason) {
		return res.status(500).send({ message: reason });
	}
	const accessToken = jwt.sign({ username }, SecretKey, { expiresIn: 60 * 10 });
	const refreshToken = jwt.sign({ username }, RefreshKey, {
		expiresIn: 60 * 24 * 365 * 2,
	});

	return AttachAccessTokenAndRefreshTokenToResponse(res, {
		access_token: accessToken,
		refresh_token: refreshToken,
	})
		.status(200)
		.send({ message: "successfully logged in" });
};

export const RefreshUserToken = async (req: Request, res: Response) => {
	const { refresh_token } = req.cookies;
	if (refresh_token)
		try {
			const { new_access_token, new_refresh_token, username } =
				await VerifyRefreshToken(refresh_token);
			await AddRefreshTokenToBlacklist(username, refresh_token);
			return AttachAccessTokenAndRefreshTokenToResponse(res, {
				access_token: new_access_token,
				refresh_token: new_refresh_token,
			})
				.status(200)
				.send();
		} catch (e: any) {
			return ClearAccessTokenAndRefreshTokenFromClient(res)
				.status(403)
				.send({ message: e });
		}
	else return res.status(403).end();
};

export const Logout = (req: Request, res: Response) => {
	const tokens = req.cookies;
	if (tokens)
		return ClearAccessTokenAndRefreshTokenFromClient(res).status(200).send();
	return res.status(404).send();
};
