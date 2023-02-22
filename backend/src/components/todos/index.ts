import { Router } from "express";
import { newTodo, findAllTodos, findTodoById, updateTodo, deleteTodo, translateToDo } from "./controller";
import { verifyAuthentication } from "../authenticate";

const todoRouter: Router = Router();

todoRouter.get("/", verifyAuthentication, findAllTodos);
todoRouter.get("/:idTodo", verifyAuthentication, findTodoById);
todoRouter.get("/translate/:idTodo", verifyAuthentication, translateToDo);
todoRouter.post("/", verifyAuthentication, newTodo);
todoRouter.put("/:idTodo", verifyAuthentication, updateTodo);
todoRouter.delete("/:idTodo", verifyAuthentication, deleteTodo);

export default todoRouter;