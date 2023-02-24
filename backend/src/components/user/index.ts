import { Router } from "express";
import { verifyAuthentication, isAdministrator } from "../authenticate";
import {
  findAllUsers,
  getOneUser,
  signup,
  login,
  updateUser,
  removeUser,
} from "./controller";

const userRouter: Router = Router();

userRouter.get("/", verifyAuthentication, isAdministrator, findAllUsers);
userRouter.get("/:idUser", getOneUser);
userRouter.put("/:idUser", updateUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/:idUser", removeUser);

export default userRouter;
