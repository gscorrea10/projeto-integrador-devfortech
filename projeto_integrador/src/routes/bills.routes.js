import { Router } from 'express';
import BillsController from '../controllers/bills.controller.js';
import IsAdmin from '../middlewares/isAdmin.middleware.js';
import AuthTokenMiddleware from '../middlewares/authToken.middleware.js';
import { validationBodyCallAPI, checkCallAPI } from '../utils/validators/bills.validator.js';

export const billsRouter = Router();

billsRouter.use(AuthTokenMiddleware.verifyToken, IsAdmin.verifyAdmin);
billsRouter.post('/', validationBodyCallAPI, checkCallAPI, BillsController.search_plate);
billsRouter.get('/:id_vehicle', BillsController.getVehicleBills);
