import { Router } from "express";
import UsersController from "../controllers/users.controller.js";
import { sessionsRouter } from "./sessions.routes.js";

export const userRouter = Router();

//User routes
userRouter.post("/", UsersController.create);
userRouter.get("/", UsersController.index);
userRouter.get("/:id", UsersController.retrieve);
userRouter.patch("/:id", UsersController.update);
userRouter.delete("/:id", UsersController.destroy);

//Sessions routes
userRouter.use("/sessions", sessionsRouter);
