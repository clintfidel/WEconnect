import express from 'express';
import { checkUserInput, userNameOrEmailExist } from '../middleware/validation';
import isLoggedIn from '../middleware/Authorization';
import User from '../controllers/UserController';

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
  .put(isLoggedIn, updateUserProfile);


export default userRouter;
