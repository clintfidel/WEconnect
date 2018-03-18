import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkBusinessInput, checkReviewsInput, searchBusiness,
  validateEditUserId, checkInvalidUser, verifyUserIdExist,
  checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
  checkReviewInvalidDetails, checkValidIdParams
} from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, createReview,
  getAllReviews, viewBusiness
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
    checkValidIdParams, updateBusiness
  )
  .delete(isLoggedIn, verifyUserIdExist, checkInvalidUser, checkValidIdParams, deleteBusiness)
  .get(isLoggedIn, verifyUserIdExist, checkValidIdParams, getOneBusiness);

businessRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewsInput, verifyUserIdExist, checkReviewInvalidDetails,
    checkValidIdParams, createReview
  )
  .get(isLoggedIn, verifyUserIdExist, checkValidIdParams, getAllReviews);

businessRouter.route('/:businessId/views')
  .get(isLoggedIn, checkValidIdParams, viewBusiness);


export default businessRouter;
