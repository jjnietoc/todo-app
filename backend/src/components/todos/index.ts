import { Router } from "express";
import { newTodo, findAllTodos, findTodoById, updateTodo, deleteTodo } from "./controller";
import { verifyAuthentication } from "../authenticate";

const todoRouter: Router = Router();

todoRouter.get("/", verifyAuthentication, findAllTodos);
todoRouter.get("/:idTodo", verifyAuthentication, findTodoById);
todoRouter.post("/", verifyAuthentication, newTodo);
todoRouter.put("/:idTodo", verifyAuthentication, updateTodo);
todoRouter.delete("/:idTodo", verifyAuthentication, deleteTodo)

export default todoRouter;