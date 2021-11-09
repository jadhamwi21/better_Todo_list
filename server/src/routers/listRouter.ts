import { Router } from "express";
import { AddList, DeleteList, GetLists } from "../controllers/listController";
import { Authorization } from "../middlewares/authorization.middleware";

export const ListRouter = Router();

ListRouter.post("/add_list", Authorization, AddList);

ListRouter.delete("/delete_list", Authorization, DeleteList);

ListRouter.get("/get_lists", Authorization, GetLists);
