import type { Request, Response } from "express";
import prisma from "../../datasource";

// CREATE todo item
export const newTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const todoData = await prisma.todo.create({ data: req.body });
        res.status(201).json({
            ok: true,
            body: todoData,
            message: "todo created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, message: error });
    }
};

// GET all todo items
export const findAllTodos = async (_req: Request, res: Response): Promise<void> => {
    try {
        const all_todos = await prisma.todo.findMany();
        res.status(200).json({ ok: true, body: all_todos });
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};

// GET todo by id
export const findTodoById = async (req: Request, res: Response): Promise<void> => {
    try {
        const todo_id = Number(req.params.idTodo);
        const todo = await prisma.todo.findUnique({
            where: {
                id: todo_id,
            }
        })
        res.status(200).json({ ok: true, body: todo?.name });
    } catch (error) {
        console.log(error)
        res.status(500).json({ ok: false, message: error });
    }
};

// UPDATE todo by id
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.idTodo);
        const todo = await prisma.todo.update({
            where: { id },
            data: req.body, 
        });
        res.json({ ok: true, body: todo, message: "To-do item updated successfully." });
    } catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};

// REMOVE todo by id
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.idTodo);
        await prisma.todo.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "", message: "To-do item deleted successfully." });
    } catch (error) {
        res.status(500).json({ ok: false, body: error })
    }
};