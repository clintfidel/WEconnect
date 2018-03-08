import express from 'express';
import Business from '../controllers/BusinessController';
import isLoggedIn from '../middleware//Authorization';
import { checkBusinessInput, checkReviewsInput, seaarchBusiness, checkAuthorizedUser, checkBusinessNameExist } from '../middleware/validation';

const {
  reviewBusiness, addbusiness, updateBusiness,
  deleteBusiness, getAllBusiness, getOneBusiness, getAllReview
} = Business;

const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, checkBusinessNameExist, checkBusinessInput, addbusiness)
  .get(isLoggedIn, seaarchBusiness, getAllBusiness);

businessRouter.route('/:id/business')
  .get(isLoggedIn, getOneBusiness)
  .put(isLoggedIn, checkBusinessInput, checkBusinessNameExist, checkAuthorizedUser, updateBusiness)
  .delete(isLoggedIn, deleteBusiness, checkAuthorizedUser);

businessRouter.route('/review/:businessId')
  .post(isLoggedIn, checkReviewsInput, reviewBusiness);

businessRouter.route('/:businessId/reviews')
  .get(isLoggedIn, getAllReview);

// businessRouter.route('/category')
//   .post(isLoggedIn, addCategory);


export default businessRouter;
