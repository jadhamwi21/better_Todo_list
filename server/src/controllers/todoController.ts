import { Request, Response } from "express";
import { User } from "../models/userModel";
import {
	Capitalize,
	CheckListExistance,
	CheckTodoExistance,
	GetIndexOfList,
	GetIndexOfTodo,
} from "../utils/utils";

export const AddTodo = async (req: Request, res: Response) => {
	const { ListName, TodoName } = req.body;
	const user = await User.findOne({ username: req.username });
	if (!CheckListExistance(user?.lists!, Capitalize(ListName))) {
		return res.status(404).send({ message: "List Doesn't Exist" });
	}
	if (CheckTodoExistance(user?.lists!, Capitalize(ListName), TodoName)) {
		return res.status(403).send({ message: "Todo Exists In This List" });
	}
	const IndexOfList = GetIndexOfList(user?.lists!, ListName);
	user?.lists[IndexOfList].Todos.push({
		name: TodoName,
		status: "in progress",
	});
	await user?.save();
	return res.status(200).send({ message: `Todo Added To List ${ListName}` });
};

export const DeleteTodo = async (req: Request, res: Response) => {
	const { ListName, TodoName } = req.body;
	const user = await User.findOne({ username: req.username });
	const IndexOfList = GetIndexOfList(user?.lists!, ListName);
	const IndexOfTodo = GetIndexOfTodo(user?.lists[IndexOfList].Todos!, TodoName);
	if (IndexOfList !== -1 && IndexOfTodo !== -1) {
		user?.lists[IndexOfList].Todos.splice(IndexOfTodo, 1);
		await user?.save();
		return res.status(204).send({ message: `Todo Deleted` });
	} else {
		return res.status(404).send({ message: "an error occured" });
	}
};
export const ChangeTodoStatus = async (req: Request, res: Response) => {
	const { ListName, TodoName, TodoStatus } = req.body;
	User.findOne({ username: req.username }).exec(async (err, user) => {
		const IndexOfList = GetIndexOfList(user?.lists!, ListName);
		const IndexOfTodo = GetIndexOfTodo(
			user!.lists[IndexOfList].Todos!,
			TodoName
		);
		if (IndexOfList !== -1 && IndexOfTodo !== -1) {
			user!.lists[IndexOfList].Todos[IndexOfTodo].status = TodoStatus;
			await user!.save();
			return res
				.status(204)
				.send({ message: `Todo Status Updated To ${TodoStatus}` });
		} else {
			return res.status(404).send({ message: "an error occured" });
		}
	});
};
