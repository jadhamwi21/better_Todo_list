import { Router } from "express";
import {
	Logout,
	RefreshUserToken,
	UserSignin,
	UserSignup,
} from "../controllers/authController";

export const AuthRouter = Router();

AuthRouter.post("/signup", UserSignup);

AuthRouter.post("/signin", UserSignin);

AuthRouter.post("/refresh_token", RefreshUserToken);

AuthRouter.post("/logout", Logout);
