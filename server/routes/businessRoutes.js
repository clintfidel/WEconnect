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
  getAllBusinessess, getOneBusiness, viewBusiness, getAllBusinessByPage
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

businessRouter.route('/:businessId/views')
  .get(isLoggedIn, checkValidIdParams, viewBusiness);


export default businessRouter;
