import express from 'express';
import business from '../controllers/BusinessController';
import isLoggedIn from '../middlewares/authorization';
import { checkBusinessInput } from '../middlewares/validation';

const { addBusiness } = business;
const businessRouter = express.Router();

businessRouter.route('/')
  .post(isLoggedIn, checkBusinessInput, addBusiness);

export default businessRouter;
