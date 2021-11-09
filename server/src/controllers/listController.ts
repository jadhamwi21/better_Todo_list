import { Request, Response } from "express";
import { User } from "../models/userModel";
import { Capitalize, CheckListExistance } from "../utils/utils";

export const AddList = async (req: Request, res: Response) => {
	const { ListName } = req.body;
	const user = await User.findOne({ username: req.username });
	if (CheckListExistance(user?.lists!, Capitalize(ListName))) {
		return res.status(403).send({ message: "List already exists" });
	}
	User.findOneAndUpdate(
		{
			username: req.username,
		},
		{
			$push: { lists: { listName: Capitalize(ListName), Todos: [] } },
		}
	)
		.then(() => {
			return res.status(200).send({ message: "list added" });
		})
		.catch((e) => {
			return res
				.status(500)
				.send({ message: "an error occured while creating the list" });
		});
};

export const DeleteList = async (req: Request, res: Response) => {
	const { ListName } = req.body;
	const user = await User.findOne({ username: req.username });
	const newLists = user?.lists.filter((list) => list.listName !== ListName);
	if (newLists?.length === user?.lists.length) {
		return res
			.status(403)
			.send({ message: "List Doesn't Exist To Get Deleted" });
	}
	User.findOneAndUpdate(
		{ username: req.username },
		{
			lists: newLists,
		}
	)
		.then((User) => {
			console.log(User);
			return res.status(204).send({ message: "deleted list" });
		})
		.catch((e) => {
			return res.status(500).send({ message: "error occured" });
		});
};

export const GetLists = async (req: Request, res: Response) => {
	const user = await User.findOne({ username: req.username });
	const lists = Object();
	user?.lists.map((list) => {
		lists[list.listName] = list.Todos;
	});
	return res.status(200).send({ lists: lists });
};
