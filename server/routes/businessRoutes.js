import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput } from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness, getAllBusinessess
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness)
  .get(isLoggedIn, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(isLoggedIn, checkBusinessInput, updateBusiness);

businessRouter.route('/:businessId')
  .delete(isLoggedIn, deleteBusiness);

export default businessRouter;
