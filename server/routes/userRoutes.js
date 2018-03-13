import express from 'express';
import user from '../controllers/UserController';
import isLoggedIn from '../middlewares/authorization';
import {
  checkUserInput, isSignedUpWithEmail, verifyUserIdExist,
  isSignedUpWithUsername, validateEdituser, checkUserInvalidDetails
} from '../middlewares/validation';

const {
  signUp, login, editProfile, getAllUsers
} = user;
const userRouter = express.Router();

userRouter.route('/signup')
  .post(
    checkUserInput, isSignedUpWithEmail,
    isSignedUpWithUsername, checkUserInvalidDetails, signUp
  );

userRouter.route('/login')
  .post(login);


userRouter.route('/editprofile')
  .put(
    isLoggedIn, isSignedUpWithEmail, verifyUserIdExist,
    isSignedUpWithUsername,
    validateEdituser, checkUserInvalidDetails, editProfile
  );



export default userRouter;
