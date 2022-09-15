import { Router } from "express";
import SessionsController from "../controllers/sessions.controller";

export const sessionsRouter = Router();

sessionsRouter.post("/login", SessionsController.login);
sessionsRouter.post("/verify", SessionsController.verifyToken);
