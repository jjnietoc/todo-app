import { Router } from "express";
import {
  findAllUsers,
  getOneUser,
  signup,
  login,
  updateUser,
  removeUser,
} from "./controller";
import { verifyAuthentication, isAdministrator } from "../authenticate";

const userRouter: Router = Router();

userRouter.get("/", verifyAuthentication, isAdministrator, findAllUsers);
userRouter.get("/:idUser", getOneUser);
userRouter.put("/:idUser", updateUser);
userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.delete("/:idUser", removeUser);

export default userRouter;
