import type { Request, Response } from "express";
import prisma from "../../datasource";
import  { TranslationServiceClient } from "@google-cloud/translate";

const translationClient = new TranslationServiceClient();

// CREATE todo item
export const newTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const toDo = {
      user_id: res.locals.user_id,
      name: req.body.name,
    };
    const todoData = await prisma.todo.create({ data: toDo });
    res.status(201).json({
      body: todoData,
      message: "todo created successfully",
    });
  } catch (error) {
    res.status(500).json(error );
  }
};

// GET all todo items
export const findAllTodos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const all_todos = await prisma.todo.findMany({
      where: {
        user_id: res.locals.user_id,
      },
    });
    res.status(200).json(all_todos);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET todo by id
export const findTodoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo_id = Number(req.params.idTodo);
    const todo = await prisma.todo.findUnique({
      where: {
        id: todo_id,
      },
    });
    res.status(200).json({ body: todo?.name });
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE todo by id
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.idTodo);
    const todo = await prisma.todo.update({
      where: { id },
      data: req.body,
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
};

// REMOVE todo by id
export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.idTodo);
    await prisma.todo.delete({
      where: { id },
    });
    res.status(204).json({
      body: "",
      message: "To-do item deleted successfully.",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// TRANSLATE todo by id
export const translateToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo_id = Number(req.params.idTodo);
    const todo = await prisma.todo.findUnique({
      where: {
        id: todo_id,
      },
    });
    const projectId = "spring-ember-377519";
    const location = "global";
    if (!todo) {
      res.status(404).json("ToDo not found.");
      return;
    }
    const text = todo.name;
    // Construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: "text/plain", // mime types: text/plain, text/html
      sourceLanguageCode: "en",
      targetLanguageCode: "es",
    };
    // Run request
    const [response] = await translationClient.translateText(request);
    const translatedText = response.translations![0].translatedText;
    // Modify ToDo item and return it
    todo.clicked = true;
    todo.translated_text = translatedText;
    await prisma.todo.update({
      where: { id: todo.id },
      data: todo,
    });
    res.json(todo);
  } catch (error) {
    res.status(404).json(error);
  }
};
