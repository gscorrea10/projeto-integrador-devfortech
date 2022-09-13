import { Router } from "express";
import BillsController from "../controllers/bills.controller.js";
import IsAdmin from "../middlewares/isAdmin.middleware.js";

export const billsRouter = Router();

billsRouter.post("/", IsAdmin.verifyAdmin, BillsController.search_plate);
billsRouter.get(
  "/:id_vehicle",
  IsAdmin.verifyAdmin,
  BillsController.getVehicleBills
);
