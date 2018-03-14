import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput } from '../middlewares/validation';
import business from '../controllers/BusinessController';

const {
  addBusiness, updateBusiness, deleteBusiness, getAllBusinessess, getOneBusiness
} = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness)
  .get(isLoggedIn, getAllBusinessess);

businessRouter.route('/:businessId')
  .put(isLoggedIn, checkBusinessInput, updateBusiness)
  .delete(isLoggedIn, deleteBusiness)
  .get(isLoggedIn, getOneBusiness);

export default businessRouter;
