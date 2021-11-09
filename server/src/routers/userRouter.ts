import { Router } from "express";
import { AuthRouter } from "./authRouter";
import { ListRouter } from "./listRouter";
import { TodoRouter } from "./todoRouter";

export const UserRouter = Router();

UserRouter.use("/auth", AuthRouter);

UserRouter.use("/list", ListRouter);

UserRouter.use("/todo", TodoRouter);
