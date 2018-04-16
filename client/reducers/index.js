import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import BusinessReducer from './BusinessReducer';
import ReviewsReducer from './ReviewReducer';


const rootReducer = combineReducers({
  AuthReducer,
  BusinessReducer,
  ReviewsReducer
});

export default rootReducer;
