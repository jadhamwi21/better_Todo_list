import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SecretKey } from "../constants/constants";
export const Authorization = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { access_token } = req.cookies;
	jwt.verify(access_token, SecretKey, (err: any, decoded: any) => {
		if (err) {
			return res.status(401).send({ message: "unauthorized" });
		} else {
			const { username } = decoded;
			req.username = username;
			return next();
		}
	});
};
