import { GET_ALL_BUSINESSES } from '../actions/types';

const initialState = {
  message: '',
  businesses: []
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
    return { ...state, businesses: action.business };

  default:
    return state;
  }
};
export default BuisnessReducer;
