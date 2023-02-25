import type { Request, Response } from "express";
import prisma from "../../datasource";
import { TranslationServiceClient } from "@google-cloud/translate";

const translationClient = new TranslationServiceClient();

// CREATE todo item
export const newToDo = async (req: Request, res: Response): Promise<void> => {
  try {
    const toDo = {
      user_id: res.locals.user_id,
      name: req.body.name,
    };

    const toDoData = await prisma.todo.create({ data: toDo });

    res.status(201).json({
      body: toDoData,
      message: "todo created successfully",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET all todo items
export const findAllToDos = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const allToDos = await prisma.todo.findMany({
      where: {
        user_id: res.locals.user_id,
      },
    });

    res.status(200).json(allToDos);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET todo by id
export const findToDoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todoId = Number(req.params.idTodo);

    const toDo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    res.status(200).json({ body: toDo?.name });
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE todo by id
export const updateToDo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.idTodo);

    const toDo = await prisma.todo.update({
      where: { id },
      data: req.body,
    });

    res.json(toDo);
  } catch (error) {
    res.status(500).json(error);
  }
};

// REMOVE todo by id
export const deleteToDo = async (
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
    const todoId = Number(req.params.idTodo);

    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    const projectId = "spring-ember-377519";

    const location = "global";

    if (!todo) {
      res.status(404).json("ToDo not found.");
      return;
    }

    const text = todo.name;

    // construct request
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [text],
      mimeType: "text/plain",
      sourceLanguageCode: "en",
      targetLanguageCode: "es",
    };

    // Run request
    const [response] = await translationClient.translateText(request);

    const translatedText = response.translations![0].translatedText;

    // modify ToDo item and return it
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
