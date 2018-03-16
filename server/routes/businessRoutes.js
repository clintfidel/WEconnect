import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkBusinessInput, checkReviewsInput, searchBusiness,
  validateEditUserId, checkInvalidUser, verifyUserIdExist,
  checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
  checkReviewInvalidDetails
} from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, createReview,
  getAllReviews
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(
    isLoggedIn, checkBusinessInput, verifyUserIdExist,
    checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
    addBusiness
  )
  .get(isLoggedIn, verifyUserIdExist, searchBusiness, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(
    isLoggedIn, checkBusinessInput, verifyUserIdExist,
    validateEditUserId, checkInvalidUser, businessNameExist, checkBusinessInvalidDetails,
    updateBusiness
  )
  .delete(isLoggedIn, verifyUserIdExist, checkInvalidUser, deleteBusiness)
  .get(isLoggedIn, verifyUserIdExist, getOneBusiness);

businessRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewsInput, verifyUserIdExist, checkReviewInvalidDetails,
    createReview
  )
  .get(isLoggedIn, verifyUserIdExist, getAllReviews);


export default businessRouter;
