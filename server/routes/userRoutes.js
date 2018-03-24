import express from 'express';
import user from '../controllers/UserController';
import isLoggedIn from '../middlewares/authorization';
import {
  checkUserInput, emailExist, verifyUserIdExist,
  usernameExist, checkUserInvalidDetails
} from '../middlewares/validation';

const {
  signUp, login, editProfile
} = user;
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    checkUserInput, emailExist,
    usernameExist, checkUserInvalidDetails, signUp
  );

userRouter.route('/login')
  .post(login);


userRouter.route('/editprofile')
  .put(
    isLoggedIn, emailExist, verifyUserIdExist,
    usernameExist,
    checkUserInvalidDetails, checkUserInput, editProfile
  );

export default userRouter;
