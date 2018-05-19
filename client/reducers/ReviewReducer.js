import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS
} from '../actions/types';

const initialState = {
  reviews: [],
  review: {},
  count: 0
};

const ReviewReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_REVIEW:
    return {
      ...state,
      reviews: action.reviews.rows,
      count: action.reviews.count
    };
  case ADD_REVIEW:
    return { ...state, reviews: [...state.reviews, action.reviews] };
  case LOAD_MORE_REVIEWS: {
    const count = action.reviews.count - state.reviews.length;
    const moreReviews = [...state.reviews, ...action.reviews.rows];
    return {
      reviews: moreReviews,
      count: count
    };
  }

  default:
    return state;
  }
};

export default ReviewReducer;
