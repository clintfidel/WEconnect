import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput, checkReviewsInput } from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, createReview
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness)
  .get(isLoggedIn, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(isLoggedIn, checkBusinessInput, updateBusiness)
  .delete(isLoggedIn, deleteBusiness)
  .get(isLoggedIn, getOneBusiness);

businessRouter.route('/:businessId/reviews')
  .post(isLoggedIn, checkReviewsInput, createReview);

export default businessRouter;
