import { Router } from 'express';
import { ProcessController } from '../controllers/process.controller';
import IsAdmin from "../middlewares/isAdmin.middleware.js";
import AuthTokenMiddleware from "../middlewares/authToken.middleware.js";

export const processRouter = Router();
processRouter.use(AuthTokenMiddleware.verifyToken);
processRouter.get('/get-by-ait', ProcessController.getByAit);

processRouter.use(IsAdmin.verifyAdmin)
processRouter.post('/', ProcessController.create);
processRouter.patch('/:id', ProcessController.update);
processRouter.delete('/:id', ProcessController.deleteProcess);
