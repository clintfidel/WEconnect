import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  user: {},
  authenticated: false,
  message: ''
};

/**
 * @description - User authentication reducer
 *
 * @param {Object} state - Default application state
 *
 * @param {Object} action - Response from the API
 *
 * @returns {Object} - Object containing new state
 */
function AuthReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_USER:
    return { ...state, user: action.user, authenticated: action.authenticated };

  default:
    return state;
  }
}
export default AuthReducer;
