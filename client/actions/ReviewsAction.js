import axios from 'axios';
import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS,
  UPDATE_REVIEW,
  GET_NUMBER_USERS_RATED
} from './types';

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

export const addReviewAction = (businessId, review) => (dispatch) =>
  axios.post(`/api/v1/businesses/${businessId}/reviews`, review)
    .then((response) => {
      dispatch({
        type: ADD_REVIEW,
        reviews: response.data.Review
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));

export const updateReviewAction = (reviewId, editReview) => (dispatch) =>
  axios.put(`/api/v1/businesses/${reviewId}/reviews`, editReview)
    .then((response) => {
      dispatch({
        type: UPDATE_REVIEW,
        reviews: response.data.review
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
