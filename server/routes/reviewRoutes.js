import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkReviewsInput,
  verifyUserIdExist,
  checkReviewInvalidDetails, checkValidIdParams, verifyBusinessIdExist
} from '../middlewares/validation';
import review from '../controllers/ReviewController';

const { createReview, getAllReview } = review;

const reviewRouter = express.Router();
reviewRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewsInput, checkReviewInvalidDetails, verifyUserIdExist,
    verifyBusinessIdExist,
    checkValidIdParams, createReview
  )
  .get(isLoggedIn, verifyUserIdExist, verifyBusinessIdExist, getAllReview);

export default reviewRouter;
