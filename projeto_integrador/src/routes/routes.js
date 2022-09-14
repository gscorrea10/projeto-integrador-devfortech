import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { sessionsRouter } from "./sessions.routes.js";
import { billsRouter } from "./bills.routes.js";
import { processRouter } from "./process.routes.js";

export const routes = Router();
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/bills", billsRouter);
routes.use("/process", processRouter);
