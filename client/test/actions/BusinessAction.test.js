import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
// import jsonwebtoken from 'jsonwebtoken';
import mockLocalStorage from '../mocks/mockLocalStorage';
import mockData from '../mocks/mockData';

import {
  getAllBusinessAction,
  getAllUserBusinessAction,
  getAllCategoryAction,
  addBusinessAction,
  viewBusinessAction,
  deleteBusinessAction,
  editBusinessAction,
  imageUploadAction,
  searchBusinessAction,
  searchUserBusinessAction
} from '../../actions/BusinessAction';
import {
  GET_ALL_BUSINESSES,
  GET_ALL_USER_BUSINESS,
  ADD_BUSINESS,
  GET_ALL_CATEGORY,
  VIEW_BUSINESS,
  DELETE_BUSINESS,
  EDIT_BUSINESS,
  SEARCH_BUSINESS,
  SEARCH_USER_BUSINESS,
  IMAGE_UPLOAD,
} from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Business actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('getAllBusiness action creator', () => {
    it(
      'creats the GET_ALL_BUSINESSES action ',
      async (done) => {
        const { getBusinessDetails } = mockData;
        moxios.stubRequest(`/api/v1/businesses?pageNum=${1}`, {
          status: 200,
          response: getBusinessDetails,
        });
        const store = mockStore({});
        await store.dispatch(getAllBusinessAction(1))
          .then(() => {
            const businessActionResult = [{
              type: GET_ALL_BUSINESSES,
              businesses: getBusinessDetails.businesses
            }];
            expect(store.getActions()).toEqual(businessActionResult);
          });
        done();
      }
    );
  });
  describe('getAllUserBusiness action creator', () => {
    it(
      'creats the GET_ALL_USER_BUSINESS action ',
      async (done) => {
        const { getBusinessDetails } = mockData;
        moxios.stubRequest(`/api/v1/businesses/user?pageNum=${1}`, {
          status: 200,
          response: getBusinessDetails,
        });
        const store = mockStore({});
        await store.dispatch(getAllUserBusinessAction(1))
          .then(() => {
            const userBusinessActionResult = [{
              type: GET_ALL_USER_BUSINESS,
              userBusiness: getBusinessDetails.businesses
            }];
            expect(store.getActions()).toEqual(userBusinessActionResult);
          });
        done();
      }
    );
  });
  describe('getAllCategoryAction action creator', () => {
    it(
      'creats the GET_ALL_CATEGORY action ',
      async (done) => {
        const { allCategories } = mockData;
        moxios.stubRequest('/api/v1/businesses/category', {
          status: 200,
          response: allCategories,
        });
        const store = mockStore({});
        await store.dispatch(getAllCategoryAction())
          .then(() => {
            const getCategoryResult = [{
              type: GET_ALL_CATEGORY,
              categories: allCategories.Categories
            }];
            expect(store.getActions()).toEqual(getCategoryResult);
          });
        done();
      }
    );
  });
  describe('addBusinessAction, action creator', () => {
    it(
      'creats the ADD_BUSINESS action ',
      async (done) => {
        const { businessDetails, businessResponse } = mockData;
        moxios.stubRequest('/api/v1/businesses', {
          status: 201,
          response: businessResponse,
        });
        const store = mockStore({});
        await store.dispatch(addBusinessAction(businessDetails))
          .then(() => {
            const addBusinessResult = [{
              type: ADD_BUSINESS,
              userBusiness: businessResponse.businessProfile
            }];
            expect(store.getActions()).toEqual(addBusinessResult);
          });
        done();
      }
    );
  });
  describe('editBusinessAction, action creator', () => {
    it(
      'creats the EDIT_BUSINESS action ',
      async (done) => {
        const { editedBusinessDetails, editedBusinessResponse, businessId } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: editedBusinessResponse,
        });
        const store = mockStore({});
        await store.dispatch(editBusinessAction(businessId, editedBusinessDetails))
          .then(() => {
            const editBusinessResult = [{
              type: EDIT_BUSINESS,
              business: editedBusinessResponse.business
            }];
            expect(store.getActions()).toEqual(editBusinessResult);
          });
        done();
      }
    );
  });
  describe('deleteBusinessAction, action creator', () => {
    it(
      'creats the DELETE_BUSINESS action ',
      async (done) => {
        const { businessId, deletedBusinessResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: deletedBusinessResponse,
        });
        const store = mockStore({});
        await store.dispatch(deleteBusinessAction(businessId))
          .then(() => {
            const deleteBusinessResult = [{
              type: DELETE_BUSINESS,
              businessId: deletedBusinessResponse.businessId
            }];
            expect(store.getActions()).toEqual(deleteBusinessResult);
          });
        done();
      }
    );
  });
  describe('viewBusinessAction, action creator', () => {
    it(
      'creats the VIEW_BUSINESS action ',
      async (done) => {
        const { businessId, viewBusinessResponse } = mockData;
        moxios.stubRequest(`/api/v1/businesses/${businessId}`, {
          status: 200,
          response: viewBusinessResponse,
        });
        const store = mockStore({});
        await store.dispatch(viewBusinessAction(businessId))
          .then(() => {
            const viewBusinessResult = [{
              type: VIEW_BUSINESS,
              business: viewBusinessResponse.business
            }];
            expect(store.getActions()).toEqual(viewBusinessResult);
          });
        done();
      }
    );
  });
  describe('searchBusinessAction, action creator', () => {
    it(
      'creats the SEARCH_BUSINESS action ',
      async (done) => {
        const { getBusinessDetails, searchDetails } = mockData;
        moxios.stubRequest(`/api/v1/businesses?location=${searchDetails.location}&category=${searchDetails.category}`, {
          status: 200,
          response: getBusinessDetails,
        });
        const store = mockStore({});
        await store.dispatch(searchBusinessAction(null, searchDetails.location, searchDetails.category))
          .then(() => {
            const searchBusinessResult = [{
              type: SEARCH_BUSINESS,
              result: getBusinessDetails.businesses
            }];
            expect(store.getActions()).toEqual(searchBusinessResult);
          });
        done();
      }
    );
  });
  describe('searchUserBusinessAction, action creator', () => {
    it(
      'creats the SEARCH_BUSINESS action ',
      async (done) => {
        const { getBusinessDetails, searchDetails } = mockData;
        moxios.stubRequest(`/api/v1/businesses/user?name=${searchDetails.name}&`, {
          status: 200,
          response: getBusinessDetails,
        });
        const store = mockStore({});
        await store.dispatch(searchUserBusinessAction(searchDetails.name, null, null))
          .then(() => {
            const searchBusinessResult = [{
              type: SEARCH_USER_BUSINESS,
              result: getBusinessDetails.businesses
            }];
            expect(store.getActions()).toEqual(searchBusinessResult);
          });
        done();
      }
    );
  });
});
