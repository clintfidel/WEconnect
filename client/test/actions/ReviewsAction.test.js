import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import jsonwebtoken from 'jsonwebtoken';
import mockLocalStorage from '../mocks/mockLocalStorage';
import mockData from '../mocks/mockData';

import {
  allReviewAction,
  addReviewAction,
  updateReviewAction
} from '../../actions/ReviewsAction';
import {
  GET_ALL_REVIEW,
  ADD_REVIEW,
  LOAD_MORE_REVIEWS,
  UPDATE_REVIEW,
} from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Review actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('allReviewAction action creator', () => {
    it(
      'creats the GET_ALL_REVIEW action ',
      async (done) => {
        const { businessId, reviewResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?pageNum=${1}`, {
          status: 200,
          response: reviewResponse,
        });
        const store = mockStore({});
        await store.dispatch(allReviewAction(businessId, 1))
          .then(() => {
            const reviewActionResult = [{
              type: GET_ALL_REVIEW,
              reviews: reviewResponse.reviews
            }];
            expect(store.getActions()).toEqual(reviewActionResult);
          });
        done();
      }
    );
  });

  describe('allReviewAction action creator', () => {
    it(
      'creats the LOAD_MORE_REVIEWS action ',
      async (done) => {
        const { businessId, reviewResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews?pageNum=${2}`, {
          status: 200,
          response: reviewResponse,
        });
        const store = mockStore({});
        await store.dispatch(allReviewAction(businessId, 2))
          .then(() => {
            const reviewActionResult = [{
              type: LOAD_MORE_REVIEWS,
              reviews: reviewResponse.reviews
            }];
            expect(store.getActions()).toEqual(reviewActionResult);
          });
        done();
      }
    );
  });

  describe('addReviewAction action creator', () => {
    it(
      'creats the ADD_REVIEW action ',
      async (done) => {
        const { businessId, reviewDetails, addReviewResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}/reviews`, {
          status: 200,
          response: addReviewResponse,
        });
        const store = mockStore({});
        await store.dispatch(addReviewAction(businessId, reviewDetails))
          .then(() => {
            const reviewActionResult = [{
              type: ADD_REVIEW,
              reviews: addReviewResponse.Review
            }];
            expect(store.getActions()).toEqual(reviewActionResult);
          });
        done();
      }
    );
  });
  describe('updateReviewAction action creator', () => {
    it(
      'creats the UPDATE_REVIEW action ',
      async (done) => {
        const { reviewId, editedReview, editedReviewResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${reviewId}/reviews`, {
          status: 200,
          response: editedReviewResponse,
        });
        const store = mockStore({});
        await store.dispatch(updateReviewAction(reviewId, editedReview))
          .then(() => {
            const reviewActionResult = [{
              type: UPDATE_REVIEW,
              reviews: editedReviewResponse.review
            }];
            expect(store.getActions()).toEqual(reviewActionResult);
          });
        done();
      }
    );
  });
});
