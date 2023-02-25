import { Router } from "express";
import { verifyAuthentication, isAdministrator } from "../authenticate";
import {
  findAllUsers,
  getOneUser,
  signUp,
  login,
  updateUser,
  removeUser,
} from "./controller";

const userRouter: Router = Router();

userRouter.get("/", verifyAuthentication, isAdministrator, findAllUsers);
userRouter.get("/:idUser", getOneUser);
userRouter.put("/:idUser", updateUser);
userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.delete("/:idUser", removeUser);

export default userRouter;
