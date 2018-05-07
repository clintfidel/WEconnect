import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthorization from '../utils/authorization';
import {
  SET_CURRENT_USER,
  USER_LOGOUT,
  USER_PROFILE,
  EDIT_USER_PROFILE,
  IMAGE_UPLOAD
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

/**
 * @description - upload image
 *
 * @param {string} imageUrl - conains image url
 *
 * @returns {Object} - redux action to be dispatched
 */
export function imageUpload(imageUrl) {
  return {
    type: IMAGE_UPLOAD,
    imageUrl,
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

export const imageUploadAction = (image) => {
  const uploadPreset = process.env.UPLOAD_PRESET;
  const cloudApi = process.env.CLOUD_API;
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', uploadPreset);
  delete axios.defaults.headers.common.Authorization; // eslint-disable-line
  return dispatch => axios.post(cloudApi, formData)
    .then((res) => {
      let token = localStorage.getItem('token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      setAuthorization(token);
      dispatch(imageUpload(res.data.public_id));
    })
    .catch((error) => {
      throw (error);
    });
};

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
