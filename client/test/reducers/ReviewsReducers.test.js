import expect from 'expect';
import MockData from '../mocks/mockData';
import ReviewReducer from '../../reducers/ReviewReducer';
import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS,
  UPDATE_REVIEW
} from '../../actions/types';

describe('Reviews Reducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      reviews: [],
      review: {},
      count: 0
    };
    expect(ReviewReducer(undefined, initialState)).toEqual(initialState);
  });
  it('should get all reviews when passed with GET_ALL_REVIEW', () => {
    const initialState = {
      reviews: []
    };
    const { reviewResponse } = MockData;
    const action = {
      type: GET_ALL_REVIEW,
      reviews: reviewResponse.reviews
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews[0].id).toEqual(15);
    expect(newState.reviews[0].userId).toEqual(1);
    expect(newState.reviews[0].businessId).toEqual(1);
    expect(newState.reviews[0].rate).toEqual(4);
    expect(newState.reviews[0].comments).toEqual("cool business");
    expect(newState.reviews[0].User.username).toEqual("clintrk");
  });
  it('should add reviews when passed with ADD_REVIEW', () => {
    const initialState = {
      reviews: []
    };
    const { reviewDetails } = MockData;
    const action = {
      type: ADD_REVIEW,
      reviews: reviewDetails
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews[0].rate).toEqual(5);
    expect(newState.reviews[0].comments).toEqual('very good business');
  });
  it('should edit reviews when passed with UPDATE_REVIEW', () => {
    const { editedReview, reviewDetails } = MockData;
    const initialState = {
      reviews: [reviewDetails]
    };
    const action = {
      type: UPDATE_REVIEW,
      reviews: editedReview
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews[0].rate).toEqual(3);
    expect(newState.reviews[0].comments).toEqual('nice nice');
  });
  it('should not edit reviews when the id passed with UPDATE_REVIEW is different', () => {
    const { newEditedReview, newReviewDetails } = MockData;
    const initialState = {
      reviews: [newReviewDetails]
    };
    const action = {
      type: UPDATE_REVIEW,
      reviews: newEditedReview
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews[0].rate).toEqual(5);
    expect(newState.reviews[0].id).toEqual(2);
    expect(newState.reviews[0].comments).toEqual('very good business');
  });
  it('should load more reviews when passed with LOAD_MORE_REVIEWS', () => {
    const initialState = {
      reviews: []
    };
    const { reviewResponse } = MockData;
    const action = {
      type: LOAD_MORE_REVIEWS,
      reviews: reviewResponse.reviews
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews[0].id).toEqual(15);
    expect(newState.reviews[0].userId).toEqual(1);
    expect(newState.reviews[0].businessId).toEqual(1);
    expect(newState.reviews[0].rate).toEqual(4);
    expect(newState.reviews[0].comments).toEqual("cool business");
    expect(newState.reviews[0].User.username).toEqual("clintrk");
  });
  it('should return initial state for invalid action type', () => {
    const initialState = {
      reviews: []
    };
    const { reviewResponse } = MockData;
    const action = {
      type: 'TEST',
      reviews: reviewResponse.reviews
    };
    const newState = ReviewReducer(initialState, action);
    expect(newState.reviews).toEqual([]);
  });
});
