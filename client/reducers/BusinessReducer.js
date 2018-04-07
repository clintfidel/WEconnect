import {
  GET_ALL_BUSINESSES,
  ADD_BUSINESS,
  GET_ALL_CATEGORY
} from '../actions/types';

const initialState = {
  message: '',
  business: [],
  categories: []
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
    return { ...state, business: action.businesses };
  case GET_ALL_CATEGORY:
    return { ...state, categories: action.categories };
  case ADD_BUSINESS:
    return { ...state, business: [...state.business, action.userBusiness] };
  default:
    return state;
  }
};
export default BuisnessReducer;
