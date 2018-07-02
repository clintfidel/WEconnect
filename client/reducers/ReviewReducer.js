import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS,
  UPDATE_REVIEW
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
    return { ...state, reviews: [action.reviews, ...state.reviews] };
  case LOAD_MORE_REVIEWS: {
    const count = action.reviews.count - state.reviews.length;
    const moreReviews = [...state.reviews, ...action.reviews.rows];
    return {
      reviews: moreReviews,
      count: count
    };
  }
  case UPDATE_REVIEW:
  let updateedReview = [];
  state.reviews.map(review =>
    (review.id === action.reviews.id ?
      updateedReview.push(action.reviews) : updateedReview.push(review)));
  return { ...state, reviews: updateedReview };

  default:
    return state;
  }
};

export default ReviewReducer;
