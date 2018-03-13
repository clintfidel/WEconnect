import express from 'express';
import user from '../controllers/UserController';
import isLoggedIn from '../middlewares/authorization';
import {
  checkUserInput, isSignedUpWithEmail, verifyUserIdExist,
  isSignedUpWithUsername, validateEdituser, checkUserInvalidDetails
} from '../middlewares/validation';

const {
  signUp
} = user;
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, checkUserInvalidDetails, signUp
  );

export default userRouter;
