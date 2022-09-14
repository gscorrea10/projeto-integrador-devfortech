import { Router } from 'express';
import { ProcessController } from '../controllers/process.controller';

export const processRouter = Router();

processRouter.post('/', ProcessController.create);
processRouter.get('/get-by-ait', ProcessController.getByAit);
processRouter.put('/:id', ProcessController.update);
processRouter.delete('/:id', ProcessController.deleteProcess);
