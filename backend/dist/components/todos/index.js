"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const authenticate_1 = require("../authenticate");
const todoRouter = (0, express_1.Router)();
todoRouter.get("/", authenticate_1.verifyAuthentication, controller_1.findAllTodos);
todoRouter.get("/:idTodo", authenticate_1.verifyAuthentication, controller_1.findTodoById);
todoRouter.post("/", authenticate_1.verifyAuthentication, controller_1.newTodo);
todoRouter.put("/:idTodo", authenticate_1.verifyAuthentication, controller_1.updateTodo);
todoRouter.delete("/:idTodo", authenticate_1.verifyAuthentication, controller_1.deleteTodo);
exports.default = todoRouter;
//# sourceMappingURL=index.js.map