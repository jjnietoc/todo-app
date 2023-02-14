import { Router } from "express";
import { newTodo, findAllTodos, findTodoById, updateTodo, deleteTodo } from "./controller";

const todoRouter: Router = Router();

todoRouter.get("/", findAllTodos);
todoRouter.get("/:idTodo", findTodoById);
todoRouter.post("/", newTodo);
todoRouter.put("/:idTodo", updateTodo);
todoRouter.delete("/:idTodo", deleteTodo)

export default todoRouter;