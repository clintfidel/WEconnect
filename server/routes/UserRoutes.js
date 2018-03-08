import express from 'express';
import User from '../controllers/UserController';
import { checkUserInput, userNameOrEmailExist } from '../middleware/validation';

const {
  addUser, getUser, login, updateUserProfile
} = User;

const userRouter = express.Router();

userRouter.route('/signup')
  .post(checkUserInput, userNameOrEmailExist, addUser);

userRouter.route('/')
  .get(getUser);

userRouter.route('/login')
  .post(login);

userRouter.route('/updateProfile/:id')
  .put(updateUserProfile);


export default userRouter;
