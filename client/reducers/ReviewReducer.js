import { GET_ALL_REVIEW, ADD_REVIEW } from '../actions/types';

const initialState = {
  reviews: [],
  review: {}
};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_REVIEW:
    return { ...state, reviews: action.reviews };
  case ADD_REVIEW:
    return { ...state, reviews: [...state.reviews, action.reviews] };
  default:
    return state;
  }
};

export default ReviewReducer;