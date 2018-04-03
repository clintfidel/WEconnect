import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import searchBusiness from '../middlewares/searchBusiness';
import {
  checkBusinessInput,
  validateEditUserId, checkInvalidUser, verifyUserIdExist,
  checkCategoryId, businessNameExist, checkBusinessInvalidDetails,
  checkValidIdParams, verifyBusinessIdExist
} from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness,
  getAllBusinessess, getOneBusiness, getAllBusinessByPage
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(
    isLoggedIn, checkBusinessInput, checkBusinessInvalidDetails, verifyUserIdExist,
    checkCategoryId, businessNameExist,
    addBusiness
  )
  .get(isLoggedIn, verifyUserIdExist, getAllBusinessByPage, searchBusiness, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(
    isLoggedIn, checkBusinessInvalidDetails, verifyUserIdExist,
    verifyBusinessIdExist,
    validateEditUserId, checkCategoryId, checkInvalidUser, businessNameExist,
    checkValidIdParams, updateBusiness
  )
  .delete(
    isLoggedIn, verifyUserIdExist, checkValidIdParams,
    verifyBusinessIdExist, checkInvalidUser, deleteBusiness
  )
  .get(
    isLoggedIn, verifyUserIdExist, checkValidIdParams,
    verifyBusinessIdExist, getOneBusiness
  );


export default businessRouter;
