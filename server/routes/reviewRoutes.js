import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkReviewsInput,
  verifyUserIdExist,
  checkReviewInvalidDetails, checkValidIdParams, verifyBusinessIdExist
} from '../middlewares/validation';
import review from '../controllers/ReviewController';

const {
  createReview,
  updateReview,
  getAllReview,
  getAverageRatings,
  getAllRatingsPerNumber
} = review;

const reviewRouter = express.Router();
reviewRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewsInput, checkReviewInvalidDetails, verifyUserIdExist,
    verifyBusinessIdExist,
    checkValidIdParams, createReview
  )
  .get(isLoggedIn, verifyUserIdExist, verifyBusinessIdExist, getAllReview);

reviewRouter.route('/:reviewId/reviews')
  .put(
    isLoggedIn,
    verifyUserIdExist,
    checkReviewInvalidDetails,
    checkReviewsInput,
    updateReview
  );
reviewRouter.route('/:businessId/rate')
  .get(isLoggedIn, getAverageRatings);

reviewRouter.route('/:businessId/ratevalue')
  .get(isLoggedIn, getAllRatingsPerNumber);

export default reviewRouter;
