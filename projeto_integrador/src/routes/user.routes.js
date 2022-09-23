import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';
import {
  validationBodyCreateUser,
  checkCreateUser,
  validationBodyUpdateUser,
  checkUpdateUser,
} from '../middlewares/validators/user.validator';

export const userRouter = Router();

userRouter.post('/', validationBodyCreateUser, checkCreateUser, UsersController.create);
userRouter.get('/', UsersController.index);
userRouter.get('/:id', UsersController.retrieve);
userRouter.patch('/:id', validationBodyUpdateUser, checkUpdateUser, UsersController.update);
userRouter.delete('/:id', UsersController.destroy);
