import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput, checkReviewsInput, searchBusiness } from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, createReview,
  getAllReviews
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness)
  .get(isLoggedIn, searchBusiness, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(isLoggedIn, checkBusinessInput, updateBusiness)
  .delete(isLoggedIn, deleteBusiness)
  .get(isLoggedIn, getOneBusiness);

businessRouter.route('/:businessId/reviews')
  .post(isLoggedIn, checkReviewsInput, createReview)
  .get(isLoggedIn, getAllReviews);

// businessRouter.route('/?location=location')
//   .get(isLoggedIn, searchBusiness);

// businessRouter.route('/?categoryId=categoryId')
//   .get(isLoggedIn, searchBusiness);

export default businessRouter;
