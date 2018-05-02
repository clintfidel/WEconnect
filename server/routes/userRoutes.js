import express from 'express';
import user from '../controllers/UserController';
import isLoggedIn from '../middlewares/authorization';
import {
  checkUserInput, emailExist, verifyUserIdExist,
  usernameExist, checkUserInvalidDetails
} from '../middlewares/validation';

const {
  signUp, login, editProfile, getUser
} = user;
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    checkUserInput, checkUserInvalidDetails, emailExist,
    usernameExist, signUp
  );
userRouter.route('/')
  .get(isLoggedIn, getUser);

userRouter.route('/login')
  .post(login);

userRouter.route('/editprofile')
  .put(
    isLoggedIn, checkUserInvalidDetails, verifyUserIdExist,
    editProfile
  );

export default userRouter;
