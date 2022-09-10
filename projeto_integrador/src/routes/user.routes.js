import { Router } from "express";
import UsersController from "../controllers/users.controller.js";

export const userRouter = Router();

userRouter.post("/", UsersController.create);
userRouter.get("/", UsersController.index);
userRouter.get("/:id", UsersController.retrieve);
userRouter.patch("/:id", UsersController.update);
userRouter.delete("/:id", UsersController.destroy);
