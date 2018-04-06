import axios from 'axios';
import { GET_ALL_BUSINESSES } from './types';

/**
 * @description Request to the API to get user recipes
 *
 *
 * @return {object} dispatch object
 */
const getAllBusiness = () => (dispatch) =>
  axios.get('api/v1/businesses')
    .then((response) => {
      dispatch({
        type: GET_ALL_BUSINESSES,
        business: response.data.Businesses
      });
    })
    .catch((error) => Promise.reject(error.response.data.message));

export default getAllBusiness;
