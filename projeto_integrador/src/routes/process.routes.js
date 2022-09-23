import { Router } from 'express';
import { ProcessController } from '../controllers/process.controller';
import {
  checkCreateProcess,
  validationBodyCreateProcess,
  checkGetByNumberProcess,
  validationBodyGetByNumberProcess,
  checkUpdateProcess,
  validationBodyUpdateProcess,
  validationGellAllProcess,
  checkGetAllProcess,
} from '../utils/validators/process.validator.js';
import IsAdmin from '../middlewares/isAdmin.middleware.js';
import AuthTokenMiddleware from '../middlewares/authToken.middleware.js';

export const processRouter = Router();

processRouter.use(IsAdmin.verifyAdmin);
processRouter.use(AuthTokenMiddleware.verifyToken);
processRouter.get(
  '/get-by-number-process',
  validationBodyGetByNumberProcess,
  checkGetByNumberProcess,
  ProcessController.getByNumberProcess,
);
processRouter.get(
  '/get-all-process',
  validationGellAllProcess,
  checkGetAllProcess,
  ProcessController.getAllProcessFromVehicle,
);
processRouter.post('/', validationBodyCreateProcess, checkCreateProcess, ProcessController.create);
processRouter.patch('/:id', validationBodyUpdateProcess, checkUpdateProcess, ProcessController.update);
processRouter.delete('/:id', ProcessController.deleteProcess);
