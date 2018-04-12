import {
  GET_ALL_BUSINESSES,
  ADD_BUSINESS,
  GET_ALL_CATEGORY,
  VIEW_BUSINESS
} from '../actions/types';

const initialState = {
  message: '',
  businesses: [],
  categories: [],
  business: {}
};

/**
 * @description - Businesses reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
const BuisnessReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_BUSINESSES:
    return { ...state, businesses: action.businesses };
  case GET_ALL_CATEGORY:
    return { ...state, categories: action.categories };
  case ADD_BUSINESS:
    return { ...state, businesses: [...state.businesses, action.userBusiness] };
  case VIEW_BUSINESS:
    return { ...state, business: action.business };
  default:
    return state;
  }
};
export default BuisnessReducer;
