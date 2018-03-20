import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import {
  checkBusinessInput, checkReviewsInput, searchBusiness,
  validateEditUserId, checkInvalidUser, verifyUserIdExist,
  checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
  checkReviewInvalidDetails, checkValidIdParams, verifyBusinessIdExist
} from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, createReview,
  getAllReviews, viewBusiness, getAllBusinessByPage
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(
    isLoggedIn, checkBusinessInput, verifyUserIdExist,
    checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
    addBusiness
  )
  .get(isLoggedIn, verifyUserIdExist, getAllBusinessByPage, searchBusiness, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(
    isLoggedIn, checkBusinessInput, verifyUserIdExist, verifyBusinessIdExist,
    validateEditUserId, checkInvalidUser, businessNameExist, checkBusinessInvalidDetails,
    checkValidIdParams, updateBusiness
  )
  .delete(
    isLoggedIn, verifyUserIdExist, checkValidIdParams,
    verifyBusinessIdExist, checkInvalidUser, deleteBusiness
  )
  .get(
    isLoggedIn, verifyUserIdExist, checkValidIdParams,
    verifyBusinessIdExist, checkInvalidUser, getOneBusiness
  );

businessRouter.route('/:businessId/reviews')
  .post(
    isLoggedIn, checkReviewsInput, verifyUserIdExist,
    verifyBusinessIdExist, checkReviewInvalidDetails,
    checkValidIdParams, createReview
  )
  .get(isLoggedIn, verifyUserIdExist, getAllReviews);

businessRouter.route('/:businessId/views')
  .get(isLoggedIn, checkValidIdParams, viewBusiness);


export default businessRouter;
