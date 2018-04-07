import axios from 'axios';
import { GET_ALL_BUSINESSES, ADD_BUSINESS, GET_ALL_CATEGORY } from './types';

/**
 * @description Request to the API to get user recipes
 *
 *
 * @return {object} dispatch object
 */
export const getAllBusinessAction = () => (dispatch) =>
  axios.get('api/v1/businesses')
    .then((response) => {
      dispatch({
        type: GET_ALL_BUSINESSES,
        businesses: response.data.Businesses
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const getAllCategoryAction = () => (dispatch) =>
  axios.get('api/v1/businesses/category')
    .then((response) => {
      dispatch({
        type: GET_ALL_CATEGORY,
        categories: response.data.Categories
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

export const addBusinessAction = (addBusiness) => (dispatch) =>
  axios.post('api/v1/businesses', addBusiness)
    .then((response) => {
      dispatch({
        type: ADD_BUSINESS,
        userBusiness: response.data.businessProfile
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

