import express from 'express';
import Business from '../controllers/BusinessController';
import isLoggedIn from '../middleware//Authorization';
import { checkBusinessInput, checkReviewsInput, seaarchBusiness, checkAuthorizedUser, checkBusinessNameExist } from '../middleware/validation';

const {
  reviewBusiness, getOneReview, addbusiness, addCategory, updateBusiness,
  deleteBusiness, getAllBusiness, getOneBusiness
} = Business;

const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, checkBusinessNameExist, checkBusinessInput, addbusiness)
  .get(isLoggedIn, seaarchBusiness, getAllBusiness);

businessRouter.route('/:id')
  .get(isLoggedIn, getOneBusiness);

businessRouter.route('/updateBusiness/:id')
  .put(isLoggedIn, checkBusinessInput, checkBusinessNameExist, checkAuthorizedUser, updateBusiness);

businessRouter.route('/deleteBusiness/:id')
  .delete(isLoggedIn, deleteBusiness);

businessRouter.route('/review/:businessId')
  .post(isLoggedIn, checkReviewsInput, reviewBusiness);

businessRouter.route('/review/:id')
  .get(isLoggedIn, getOneReview);

businessRouter.route('/category')
  .post(isLoggedIn, addCategory);


export default businessRouter;
