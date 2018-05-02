import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorization from '../utils/authorization';
import {
  SET_CURRENT_USER,
  USER_LOGOUT,
  USER_PROFILE,
  EDIT_USER_PROFILE
} from './types';
import toastrOption from '../utils/toastrOption';


/**
 * @description - Set current user
 *
 * @param {Object} user - Decoded JWT Token
 *
 * @returns {Object} - redux action to be dispatched
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
    authenticated: true
  };
}

export const registerAction = userDetails => dispatch => axios
  .post('/api/v1/auth/signup', userDetails)
  .then((response) => {
    const { token } = response.data;
    setAuthorization(token);
    localStorage.setItem('token', token);
    const currentUser = jwtDecode(token);
    dispatch(setCurrentUser(currentUser));
    return response.data.message;
  })
  .catch(error => Promise.reject(error.response.data.message));

export const loginAction = userDetails => dispatch => axios
  .post('/api/v1/auth/login', userDetails)
  .then((response) => {
    const { token } = response.data.data;
    setAuthorization(token);
    localStorage.setItem('token', token);
    const currentUser = jwtDecode(token);
    dispatch(setCurrentUser(currentUser));
    return response.data.message;
  })
  .catch(error => Promise.reject(error.response.data.message));

export const editUserProfileAction = (userDetails) => (dispatch) =>
  axios.put('/api/v1/auth/editprofile', userDetails)
    .then((response) => {
      dispatch({
        type: EDIT_USER_PROFILE,
        newProfile: response.data.updatedProfile
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

export const userProfileAction = () => (dispatch) =>
  axios.get('api/v1/auth/')
    .then((response) => {
      dispatch({
        type: USER_PROFILE,
        profile: response.data.data
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem('token');
  setAuthorization(false);
  dispatch({
    type: USER_LOGOUT,
    user: {}
  });
  toastrOption();
  toastr.success('You have logged out successfully');
};
