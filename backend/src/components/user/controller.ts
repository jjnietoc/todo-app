import type { Request, Response } from "express";
import { User } from "../../datasource/generated/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../datasource";

const secretKey = process.env.SECRET_KEY || "Secret key";

// GET all users
export const findAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      include: {
        todos: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET user by id
export const getOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = Number(req.params.idUser);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        todos: true,
      },
    });
    res.json({ body: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

// POST signup data, CREATE new user
export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    data.last_session = data.last_session || null;

    const encryptedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      name: data.name,
      email: data.email,
      password: encryptedPassword,
      isAdmin: data.isAdmin,
      last_session: new Date(data.last_session),
    };
    const user = await prisma.user.create({ data: newUser });

    const token = jwt.sign(
      { id: user.id, email: user.email, isAdmin: user.isAdmin },
      secretKey,
      {
        expiresIn: 86400,
      }
    );

    res.status(201).json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// POST login data
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).json("Something went wrong.");
    } else {
      const isValid = await bcrypt.compare(password, user.password);

      if (isValid) {
        const token = jwt.sign(
          { id: user.id, email: user.email, isAdmin: user.isAdmin },
          secretKey,
          {
            expiresIn: 86400,
          }
        );
        user.password = "";
        const isAdmin = user.isAdmin;
        res.status(201).json({ user, token, isAdmin });
      } else {
        res.status(400).json("Something went wrong.");
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// UPDATE user data by id
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.idUser);
    const user = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.json({ body: user, message: "User updated succesfully." });
  } catch (error) {
    res.status(500).json(error);
  }
};

// REMOVE user by id
export const removeUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.idUser);
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).json({ body: "", message: "User deleted." });
  } catch (error) {
    res.status(500).json(error);
  }
};
