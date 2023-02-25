import { Router } from "express";
import { verifyAuthentication } from "../authenticate";
import {
  newToDo,
  findAllToDos,
  findToDoById,
  updateToDo,
  deleteToDo,
  translateToDo,
} from "./controller";


const todoRouter: Router = Router();

todoRouter.get("/", verifyAuthentication, findAllToDos);
todoRouter.get("/:idTodo", verifyAuthentication, findToDoById);
todoRouter.get("/translate/:idTodo", verifyAuthentication, translateToDo);
todoRouter.post("/", verifyAuthentication, newToDo);
todoRouter.put("/:idTodo", verifyAuthentication, updateToDo);
todoRouter.delete("/:idTodo", verifyAuthentication, deleteToDo);

export default todoRouter;
