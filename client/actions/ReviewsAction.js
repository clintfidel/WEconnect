import axios from 'axios';
import { GET_ALL_REVIEW } from './types';

export const allReviewAction = (businessId) => (dispatch) =>
  axios.get(`/api/v1/businesses/${businessId}/reviews`)
    .then((response) => {
      console.log(response, '==+=+==>');
      dispatch({
        type: GET_ALL_REVIEW,
        reviews: response.data.allReviews
      });
    })
    .catch(error => Promise.reject(error.response.data.message));

// export allReviewAction;
