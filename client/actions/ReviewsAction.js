import axios from 'axios';
import { GET_ALL_REVIEW, ADD_REVIEW, LOAD_MORE_REVIEWS } from './types';

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

export const addReviewAction = (businessId, comment) => (dispatch) =>
  axios.post(`/api/v1/businesses/${businessId}/reviews`, comment)
    .then((response) => {
      dispatch({
        type: ADD_REVIEW,
        reviews: response.data.Review
      });
      return response.data.message;
    })
    .catch(error => Promise.reject(error.response.data.message));
