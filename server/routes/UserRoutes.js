import express from 'express';
import User from '../controllers/UserController';
import { checkUserInput, userNameOrEmailExist } from '../middleware/validation';

const { addUser, getUser, login } = User;

const userRouter = express.Router();

userRouter.route('/signup')
  .post(checkUserInput, userNameOrEmailExist, addUser);

userRouter.route('/login')
  .post(login);

userRouter.route('/')
  .get(getUser);

export default userRouter;
