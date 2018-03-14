import express from 'express';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput } from '../middlewares/validation';
import business from '../controllers/BusinessController';

const { addBusiness, updateBusiness } = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness);

businessRouter.route('/:businessId')
  .put(isLoggedIn, checkBusinessInput, updateBusiness);

export default businessRouter;
