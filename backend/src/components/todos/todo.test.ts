// Check if routes are protected

import app from "../../app";
import prisma from "../../datasource";

import { PrismaClient } from "@prisma/client";
import { generatePrismock } from "prismock";

const request = require("supertest");

// Create mock prisma schema
jest.mock("@prisma/client", () => {
  return {
    ...jest.requireActual("@prisma/client"),
    PrismaClient: jest.fn(),
  };
});

// Check protected endpoint all todos
describe("CHECK protected /todos", () => {
  it("should return forbidden", async () => {
    const todo = await prisma.user.findMany();
    await request(app).get("/api/todos").expect(401);
  });
});

// Check protected endpoint single todo
describe("CHECK protected id /todos", () => {
  it("should return forbidden", async () => {
    const todo = await prisma.user.findMany();
    await request(app).get("/api/todos/1").expect(401);
  });
});

// Create mock to-do and check if it exists
describe("CREATE /to-do", () => {
  describe("with mock", () => {
    beforeAll(async () => {
      const prismock = await generatePrismock();
      (PrismaClient as jest.Mock).mockReturnValue(prismock);
    });

    it("should create a to-do using prismock instead of prisma", async () => {
      const prisma = new PrismaClient();

      const user = await prisma.user.create({
        data: {
          name: "test",
          email: "testemail@mail.com",
          password: "test",
          isAdmin: false,
          last_session: new Date(),
        },
      });

      const todo = await prisma.todo.create({
        user_id: 1,
        name: "test to-do",
      });

      const todo_array = [];
      todo_array.push(todo);
      const found = await prisma.todo.findMany();
      expect(todo_array).toEqual(found);
    });
  });
});

// Create mock to-do and update it
describe("CREATE /to-do", () => {
  describe("with mock", () => {
    beforeAll(async () => {
      const prismock = await generatePrismock();
      (PrismaClient as jest.Mock).mockReturnValue(prismock);
    });

    it("should create a to-do using prismock instead of prisma", async () => {
      const prisma = new PrismaClient();

      const user = await prisma.user.create({
        data: {
          name: "test",
          email: "testemail@mail.com",
          password: "test",
          isAdmin: false,
          last_session: new Date(),
        },
      });

      const todo = await prisma.todo.create({
        user_id: 1,
        name: "test to-do",
      });

      const update_todo = await prisma.todo.update({
        where: { id: 1 },
        data: {
          completed: true,
        },
      });
    });
  });
});
