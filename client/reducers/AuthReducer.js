import {
  SET_CURRENT_USER,
  USER_LOGOUT,
  USER_PROFILE,
  EDIT_USER_PROFILE
} from '../actions/types';

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
const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return { ...state, user: action.user, authenticated: action.authenticated };
  case USER_PROFILE:
    return { ...state, user: action.profile, authenticated: true };
  case EDIT_USER_PROFILE:
    return { ...state, user: action.newProfile, authenticate: true };
  case USER_LOGOUT:
    return {
      ...state,
      user: action.user,
      authenticated: false,
      message: 'you have successfully Logged out'
    };
  default:
    return state;
  }
};
export default AuthReducer;
