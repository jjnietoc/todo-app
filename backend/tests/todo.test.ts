import app from "../src/app";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";
import { generatePrismock } from "prismock";

const request = require("supertest");
const secret_key = process.env.SECRET_KEY || "Secret key";

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
    await request(app).get("/api/todos").expect(401);
  });
});

// Check protected endpoint single todo
describe("CHECK protected id /todos", () => {
  it("should return forbidden", async () => {
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

    it("should create a to-do and find it using prismock", async () => {
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

    it("should create to-do and update using prismock", async () => {
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

      const data = {
        id: 1,
        completed: true,
      };

      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        secret_key
      );

      await request(app)
        .put("/api/todos/1")
        .send(data)
        .auth(user.email, user.password)
        .set("Authorization", token)
        .expect(200);
    });
  });
});

// Checks authorization, gets all to-dos
describe("GET /todos", () => {
  describe("with mock", () => {
    beforeAll(async () => {
      const prismock = await generatePrismock();
      (PrismaClient as jest.Mock).mockReturnValue(prismock);
    });

    it("should check auth and get all todos", async () => {
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
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        secret_key
      );

      await request(app)
        .get("/api/todos")
        .auth(user.email, user.password)
        .set("Authorization", token)
        .expect(200);
    });
  });
});

// Checks authorization, gets one to-do
describe("GET one todo /todos", () => {
  describe("with mock", () => {
    beforeAll(async () => {
      const prismock = await generatePrismock();
      (PrismaClient as jest.Mock).mockReturnValue(prismock);
    });

    it("check auth and get one todo", async () => {
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
      const token = jwt.sign(
        { id: user.id, email: user.email, isAdmin: user.isAdmin },
        secret_key
      );

      await request(app)
        .get("/api/todos/1")
        .auth(user.email, user.password)
        .set("Authorization", token)
        .expect(200);
    });
  });
});
