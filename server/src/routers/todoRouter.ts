import { Router } from "express";
import {
	AddTodo,
	ChangeTodoStatus,
	DeleteTodo,
} from "../controllers/todoController";
import { Authorization } from "../middlewares/authorization.middleware";

export const TodoRouter = Router();

TodoRouter.post("/add", Authorization, AddTodo);

TodoRouter.delete("/delete", Authorization, DeleteTodo);

TodoRouter.put("/change", Authorization, ChangeTodoStatus);
