"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const todoRouter = (0, express_1.Router)();
todoRouter.get("/", controller_1.findAllTodos);
todoRouter.get("/:idTodo", controller_1.findTodoById);
todoRouter.post("/", controller_1.newTodo);
todoRouter.put("/:idTodo", controller_1.updateTodo);
todoRouter.delete("/:idTodo", controller_1.deleteTodo);
exports.default = todoRouter;
//# sourceMappingURL=index.js.map