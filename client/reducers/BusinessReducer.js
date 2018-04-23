import {
  GET_ALL_BUSINESSES,
  GET_ALL_USER_BUSINESS,
  ADD_BUSINESS,
  GET_ALL_CATEGORY,
  VIEW_BUSINESS,
  DELETE_BUSINESS,
  EDIT_BUSINESS,
  SEARCH_BUSINESS
} from '../actions/types';

const initialState = {
  message: '',
  businesses: [],
  userBusiness: [],
  categories: [],
  business: {},
  count: 0
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
    return {
      ...state,
      businesses: action.businesses.rows,
      count: action.businesses.count
    };
  case GET_ALL_USER_BUSINESS:
    return {
      ...state,
      userBusiness: action.userBusiness.rows,
      count: action.userBusiness.count
    };
  case GET_ALL_CATEGORY:
    return { ...state, categories: action.categories };
  case ADD_BUSINESS:
    return { ...state, businesses: [...state.businesses, action.userBusiness] };
  case VIEW_BUSINESS:
    return { ...state, business: action.business };
  case DELETE_BUSINESS: {
    const deletedBusiness = state.businesses
      .filter(business => business.id !== action.businessId);
    return { ...state, businesses: deletedBusiness };
  }
  case EDIT_BUSINESS: {
    let newBusiness = [];
    state.businesses.map(business =>
      (business.id === action.business.id ?
        newBusiness.push(action.business) : newBusiness.push(business)));
    return { ...state, businesses: newBusiness };
  }
  case SEARCH_BUSINESS:
    return {
      ...state,
      businesses: action.result.rows,
      count: action.result.count
    };
  default:
    return state;
  }
};
export default BuisnessReducer;
