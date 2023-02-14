import type { Request, Response } from "express";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma  from "../../datasource";
import { verifyAuthentication } from "../authenticate";

const secret_key = process.env.SECRET_KEY || "Secret key";

// GET all users
export const findAllUsers = async (req: Request, res: Response): Promise<void> => {
    try { 
        if(verifyAuthentication(req, secret_key)) {
            const users = await prisma.user.findMany({
                include: {
                    todos: true,
                }
            });
            res.status(200).json({ ok: true, data: users });
        } else {
            res.status(400).json({ ok: false, message: "Authentication failed." });
        }
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};

// GET user by id
export const getOneUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user_id = Number(req.params.idUser);
        const user = await prisma.user.findUnique({
            where: {
                id: user_id,
            },
            include: {
                todos: true,
            }
        });
        res.json({ ok: true, body: user })
    } catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};

// POST signup data
export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body;
      data.last_session = data.last_session || null;
  
      const encrypted_password = await bcrypt.hash(data.password, 10);
      
      const new_user = {
        name: data.name,
        email: data.email,
        password: encrypted_password,
        last_session: new Date(data.last_session),
      }
      const user = await prisma.user.create({ data: new_user });
  
      const token = jwt.sign({id: user.id, email: user.email}, secret_key, {
        expiresIn: 86400
      });
  
      res.status(201).json({ ok: true, message: "User created successfully", data: user, token: token });

    } catch (error) {
      console.log(error)
      res.status(500).json({ ok: false, message: error });
    }
  };
  
// POST login data
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (user == null) {
            res.status(400).json({ ok: false, message: "Incorrect email." })
        } else {
            const is_valid = await bcrypt.compare(password, user.password);

            if(is_valid) {
                const token = jwt.sign({ id: user.id, email: user.email }, secret_key, {
                    expiresIn: 86400
                });

                res.status(201).json({ ok: true, message: "Login succesful", data: user, token: token });
            } else {
                res.status(400).json({ ok: false, message: "Incorrect password." });
            }
        }
    } catch (error) {
        res.status(500).json({ ok: false, message: error });
    }
};

// UPDATE user data by id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.idUser);
        const user = await prisma.user.update({
            where: { id },
            data: req.body,
        });
        res.json({ ok: true, body: user, message: "User updated succesfully." });
    } catch (error) {
        res.status(500).json({ ok: false, body: error });
    }
};

// REMOVE user by id
export const removeUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = Number(req.params.idUser);
        await prisma.user.delete({
            where: { id },
        });
        res.status(204).json({ ok: true, body: "", message: "User deleted." });
    } catch (error){
        res.status(500).json({ ok: false, body: error });
    }
};