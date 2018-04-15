import axios from 'axios';
import {
  GET_ALL_BUSINESSES,
  ADD_BUSINESS,
  GET_ALL_CATEGORY,
  VIEW_BUSINESS,
  DELETE_BUSINESS,
  EDIT_BUSINESS
} from './types';

/**
 * @description Request to the API to get user recipes
 *
 *
 * @return {object} dispatch object
 */
export const getAllBusinessAction = () => (dispatch) =>
  axios.get('/api/v1/businesses')
    .then((response) => {
      dispatch({
        type: GET_ALL_BUSINESSES,
        businesses: response.data.Businesses
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
    });

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

