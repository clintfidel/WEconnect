import axios from 'axios';
import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS,
  UPDATE_REVIEW,
} from './types';

/**
 * @description Request to the  API to get all reviews for a business
 *
 * @param {number} businessId - business id
 *
 * @param {number} page - page number
 *
 * @return {object} dispatch object
 */
export const allReviewAction = (businessId, page) => (dispatch) =>
  axios.get(`/api/v1/businesses/${businessId}/reviews?pageNum=${page}`)
    .then((response) => {
      if (page === 1) {
        dispatch({
          type: GET_ALL_REVIEW,
          reviews: response.data.reviews
        });
      } else {
        dispatch({
          type: LOAD_MORE_REVIEWS,
          reviews: response.data.reviews
        });
      }
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the  API to get add reviews for a business
 *
 * @param {number} businessId - business id
 *
 * @param {object} reviewDetails - review details
 *
 * @return {object} dispatch object
 */
export const addReviewAction = (businessId, reviewDetails) => (dispatch) =>
  axios.post(`/api/v1/businesses/${businessId}/reviews`, reviewDetails)
    .then((response) => {
      dispatch({
        type: ADD_REVIEW,
        reviews: response.data.Review
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

/**
 * @description Request to the  API to get edit reviews for a business
 *
 * @param {number} reviewId - review id
 *
 * @param {object} reviewDetails - review details
 *
 * @return {object} dispatch object
 */
export const updateReviewAction = (reviewId, reviewDetails) => (dispatch) =>
  axios.put(`/api/v1/businesses/${reviewId}/reviews`, reviewDetails)
    .then((response) => {
      dispatch({
        type: UPDATE_REVIEW,
        reviews: response.data.review
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
