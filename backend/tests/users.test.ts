import app from "../src/app";
import prisma from "../src/datasource";

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

// Check if prisma is creating users successfully
describe("CREATE /user", () => {
  describe("with mock", () => {
    beforeAll(async () => {
      const prismock = await generatePrismock();
      (PrismaClient as jest.Mock).mockReturnValue(prismock);
    });

    it("should create user using prismock instead of prisma", async () => {
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
      const user_array = [];
      user_array.push(user);
      const found = await prisma.user.findMany();
      expect(user_array).toEqual(found);
    });
  });
});

// Check if endpoint is working
describe("GET one /user", () => {
  it("should return one user", async () => {
    const user = await prisma.user.findUnique({
      where: {
        id: 1,
      },
    });
    await request(app).get(`/api/users/${user?.id}`).expect(200);
  });
});
