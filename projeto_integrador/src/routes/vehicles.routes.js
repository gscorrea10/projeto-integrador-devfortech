import { Router } from 'express';
import VehiclesController from '../controllers/vehicles.controller.js';
import { validationBodyCreateVehicle, checkCreateVehicle } from '../utils/validators/vehicle.validator.js';

import AuthTokenMiddleware from '../middlewares/authToken.middleware.js';

export const vehiclesRouter = Router();

vehiclesRouter.use(AuthTokenMiddleware.verifyToken);

vehiclesRouter.post('/', validationBodyCreateVehicle, checkCreateVehicle, VehiclesController.create);
vehiclesRouter.get('/', VehiclesController.index);
vehiclesRouter.get('/:id', VehiclesController.retrieve);
vehiclesRouter.patch('/:id', VehiclesController.update);
vehiclesRouter.delete('/:id', VehiclesController.destroy);
