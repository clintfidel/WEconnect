import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkReviewsInput,
  verifyUserIdExist,
  checkReviewInvalidDetails, checkValidIdParams, verifyBusinessIdExist
} from '../middlewares/validation';
import review from '../controllers/ReviewController';

const { createReview, getAllReviews } = review;

const reviewRouter = express.Router();
reviewRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewInvalidDetails, checkReviewsInput, verifyUserIdExist,
    verifyBusinessIdExist,
    checkValidIdParams, createReview
  )
  .get(isLoggedIn, verifyUserIdExist, getAllReviews);

export default reviewRouter;
