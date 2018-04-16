import axios from 'axios';
import { GET_ALL_REVIEW, ADD_REVIEW } from './types';

export const allReviewAction = (businessId) => (dispatch) =>
  axios.get(`/api/v1/businesses/${businessId}/reviews`)
    .then((response) => {
      dispatch({
        type: GET_ALL_REVIEW,
        reviews: response.data.allReviews
      });
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
