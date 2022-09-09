import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { sessionsRouter } from "./sessions.routes.js";

export const routes = Router();
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
