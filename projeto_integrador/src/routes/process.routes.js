import { Router } from 'express';
import { ProcessController } from '../controllers/process.controller';
import {
  checkCreateProcess,
  validationBodyCreateProcess,
  checkGetByAitProcess,
  validationBodyFindByAitProcess,
} from '../utils/validators/process.validator.js';
import IsAdmin from '../middlewares/isAdmin.middleware.js';
import AuthTokenMiddleware from '../middlewares/authToken.middleware.js';

export const processRouter = Router();

processRouter.use(IsAdmin.verifyAdmin);
processRouter.use(AuthTokenMiddleware.verifyToken);
processRouter.get('/get-by-ait', validationBodyFindByAitProcess, checkGetByAitProcess, ProcessController.getByAit);
processRouter.get('/get-all-process', ProcessController.getAllProcessFromVehicle);
processRouter.post('/', validationBodyCreateProcess, checkCreateProcess, ProcessController.create);
processRouter.patch('/:id', ProcessController.update);
processRouter.delete('/:id', ProcessController.deleteProcess);
