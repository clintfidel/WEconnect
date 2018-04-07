import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import BusinessReducer from './BusinessReducer';


const rootReducer = combineReducers({
  AuthReducer,
  BusinessReducer
});

export default rootReducer;
