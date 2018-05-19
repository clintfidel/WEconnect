import axios from 'axios';
import setAuthorization from '../utils/authorization';

import {
  GET_ALL_BUSINESSES,
  GET_ALL_USER_BUSINESS,
  ADD_BUSINESS,
  GET_ALL_CATEGORY,
  VIEW_BUSINESS,
  DELETE_BUSINESS,
  EDIT_BUSINESS,
  SEARCH_BUSINESS,
  SEARCH_USER_BUSINESS,
  IMAGE_UPLOAD,
} from './types';

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
/**
 * @description - Search business
 *
 * @param {Object} result - search result
 *
 * @returns {Object} - redux action to be dispatched
 */
export function searchBusiness(result) {
  return {
    type: SEARCH_BUSINESS,
    result,
  };
}

/**
 * @description - Search business
 *
 * @param {Object} result - search result
 *
 * @returns {Object} - redux action to be dispatched
 */
export function searchUserBusiness(result) {
  return {
    type: SEARCH_USER_BUSINESS,
    result,
  };
}
/**
 * @description - Search Query
 *
 * @param {string} name - business name
 * @param {string} location - business location
 * @param {string} category - business category
 *
 * @param {string} url - endpoint
 *
 * @returns {Object} - redux action to be dispatched
 */
export function searchQuery(name, location, category, url) {
  let queryParams = '?';
  queryParams =
    !name ? queryParams : `${queryParams}name=${name}&`;
  queryParams =
    !location ? queryParams : `${queryParams}location=${location}&`;
  queryParams =
    !category ? queryParams : `${queryParams}category=${category}`;
  url = `${url}${queryParams}`;
  return url;
}
/**
 * @description Request to the API to get users businessess
 *
 * @param {number} page
 *
 * @return {object} dispatch object
 */
export const getAllBusinessAction = (page) => (dispatch) =>
  axios.get(`/api/v1/businesses?pageNum=${page}`)
    .then((response) => {
      dispatch({
        type: GET_ALL_BUSINESSES,
        businesses: response.data.businesses
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const getAllUserBusinessAction = (page) => (dispatch) =>
  axios.get(`/api/v1/businesses/user?pageNum=${page}`)
    .then((response) => {
      dispatch({
        type: GET_ALL_USER_BUSINESS,
        userBusiness: response.data.businesses
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const getAllCategoryAction = () => (dispatch) =>
  axios.get('/api/v1/businesses/category')
    .then((response) => {
      dispatch({
        type: GET_ALL_CATEGORY,
        categories: response.data.Categories
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const addBusinessAction = (addBusiness) => (dispatch) =>
  axios.post('/api/v1/businesses', addBusiness)
    .then((response) => {
      dispatch({
        type: ADD_BUSINESS,
        userBusiness: response.data.businessProfile
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

export const viewBusinessAction = (businessId) => (dispatch) =>
  axios.get(`/api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch({
        type: VIEW_BUSINESS,
        business: response.data.business
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const deleteBusinessAction = (businessId) => (dispatch) =>
  axios.delete(`/api/v1/businesses/${businessId}`)
    .then((response) => {
      dispatch({
        type: DELETE_BUSINESS,
        businessId: parseInt(response.data.businessId, 10)
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const editBusinessAction = (businessId, businessDetails) => (dispatch) =>
  axios.put(`/api/v1/businesses/${businessId}`, businessDetails)
    .then((response) => {
      dispatch({
        type: EDIT_BUSINESS,
        business: response.data.business
      });
      return response.data.message;
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
      setAuthorization(token);
      dispatch(imageUpload(res.data.public_id));
    })
    .catch((error) => {
      throw (error);
    });
};
export const searchBusinessAction =
 (name, location, category) => (dispatch) => {
   const url = searchQuery(name, location, category, '/api/v1/businesses');
   axios.get(url)
     .then((response) => dispatch(searchBusiness(response.data.businesses)));
 };

export const searchUserBusinessAction =
 (name, location, category) => (dispatch) => {
   const url = searchQuery(name, location, category, '/api/v1/businesses/user');
   axios.get(url)
     .then((response) =>
       dispatch(searchUserBusiness(response.data.businesses)));
 };
