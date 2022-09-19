import { Router } from "express";
import { userRouter } from "./user.routes.js";
import { sessionsRouter } from "./sessions.routes.js";
import { billsRouter } from "./bills.routes.js";
<<<<<<< HEAD
import { vehiclesRouter } from "./vehicles.routes.js";
=======
import { processRouter } from "./process.routes.js";

>>>>>>> 3716dbadf0b691cac677cffd26453a5c6f7eb7c4
export const routes = Router();
routes.use("/users", userRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/bills", billsRouter);
<<<<<<< HEAD
routes.use("/vehicles", vehiclesRouter);	
=======
routes.use("/process", processRouter);
>>>>>>> 3716dbadf0b691cac677cffd26453a5c6f7eb7c4
