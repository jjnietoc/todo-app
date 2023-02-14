import { Router } from "express";
import { findAllUsers, getOneUser, signup, login, updateUser, removeUser } from "./controller";

const userRouter: Router = Router();

userRouter.get("/", findAllUsers);
userRouter.get("/:idUser", getOneUser);
userRouter.put("/:idUser", updateUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/:idUser", removeUser);

export default userRouter;
