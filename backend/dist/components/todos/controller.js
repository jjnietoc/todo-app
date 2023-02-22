"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateToDo = exports.deleteTodo = exports.updateTodo = exports.findTodoById = exports.findAllTodos = exports.newTodo = void 0;
const datasource_1 = __importDefault(require("../../datasource"));
// Google Translation API
const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();
// CREATE todo item
const newTodo = async (req, res) => {
    try {
        const toDo = {
            user_id: res.locals.user_id,
            name: req.body.name
        };
        const todoData = await datasource_1.default.todo.create({ data: toDo });
        res.status(201).json({
            ok: true,
            body: todoData,
            message: "todo created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.newTodo = newTodo;
// GET all todo items
const findAllTodos = async (req, res) => {
    try {
        const all_todos = await datasource_1.default.todo.findMany({
            where: {
                user_id: res.locals.user_id
            }
        });
        res.status(200).json(all_todos);
    }
    catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findAllTodos = findAllTodos;
// GET todo by id
const findTodoById = async (req, res) => {
    try {
        const todo_id = Number(req.params.idTodo);
        const todo = await datasource_1.default.todo.findUnique({
            where: {
                id: todo_id,
            },
        });
        res.status(200).json({ ok: true, body: todo?.name });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};
exports.findTodoById = findTodoById;
// UPDATE todo by id
const updateTodo = async (req, res) => {
    try {
        const id = Number(req.params.idTodo);
        const todo = await datasource_1.default.todo.update({
            where: { id },
            data: req.body,
        });
        res.json(todo);
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateTodo = updateTodo;
// REMOVE todo by id
const deleteTodo = async (req, res) => {
    try {
        const id = Number(req.params.idTodo);
        await datasource_1.default.todo.delete({
            where: { id },
        });
        res.status(204).json({
            ok: true,
            body: "",
            message: "To-do item deleted successfully.",
        });
    }
    catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};
exports.deleteTodo = deleteTodo;
// TRANSLATE todo by id
const translateToDo = async (req, res) => {
    try {
        const todo_id = Number(req.params.idTodo);
        const todo = await datasource_1.default.todo.findUnique({
            where: {
                id: todo_id,
            },
        });
        const projectId = 'spring-ember-377519';
        const location = 'global';
        const text = todo?.name;
        async function translateText() {
            // Construct request
            const request = {
                parent: `projects/${projectId}/locations/${location}`,
                contents: [text],
                mimeType: 'text/plain',
                sourceLanguageCode: 'en',
                targetLanguageCode: 'es',
            };
            // Run request
            const [response] = await translationClient.translateText(request);
            for (const translation of response.translations) {
                return `Translation: ${translation.translatedText}`;
            }
        }
        ;
        res.status(200).json({ body: translateText() });
    }
    catch (error) {
        res.status(200).json(error);
    }
};
exports.translateToDo = translateToDo;
//# sourceMappingURL=controller.js.map