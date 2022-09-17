import { Router } from "express";
import VehiclesController from "../../projeto_integrador/src/controllers/vehicles.controller.js";

export const vehiclesRouter = Router();

vehiclesRouter.post("/", VehiclesController.create);
vehiclesRouter.get("/", VehiclesController.index);
vehiclesRouter.get("/:id", VehiclesController.retrieve);
vehiclesRouter.patch("/:id", VehiclesController.update);
vehiclesRouter.delete("/:id", VehiclesController.destroy);