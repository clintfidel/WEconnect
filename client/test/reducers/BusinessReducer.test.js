import expect from 'expect';
import MockData from '../mocks/mockData';
import BusinessReducer from '../../reducers/BusinessReducer';
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

describe('Business Reducer', () => {
  it('should get all user business when passed with GET_ALL_USER_BUSINESSES', () => {
    const initialState = {
      businesses: [],
      count: 0
    };
    const { getBusinessDetails } = MockData;
    const action = {
      type: GET_ALL_BUSINESSES,
      businesses: getBusinessDetails.businesses
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.count).toEqual(2);
    expect(newState.businesses[0].name).toEqual("Andela Business");
    expect(newState.businesses[0].image).toEqual("jdnwyjyoiarkt47hdjjdghmxbia");
    expect(newState.businesses[0].details).toEqual("andela business is awesome");
    expect(newState.businesses[0].categoryId).toEqual(4);
  });
  it('should get all business when passed with GET_ALL_BUSINESSES', () => {
    const initialState = {
      userBusiness: [],
      count: 0
    };
    const { getBusinessDetails } = MockData;
    const action = {
      type: GET_ALL_USER_BUSINESS,
      userBusiness: getBusinessDetails.businesses
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.count).toEqual(2);
    expect(newState.userBusiness[0].name).toEqual("Andela Business");
    expect(newState.userBusiness[0].image).toEqual("jdnwyjyoiarkt47hdjjdghmxbia");
    expect(newState.userBusiness[0].details).toEqual("andela business is awesome");
    expect(newState.userBusiness[0].categoryId).toEqual(4);
  });
  it('should add business when passed with ADD_BUSINESS', () => {
    const { getBusinessDetails, businessDetails } = MockData;
    const initialState = {
      businesses: getBusinessDetails.businesses.rows,
    };
    const action = {
      type: ADD_BUSINESS,
      businesses: businessDetails
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.businesses[0].name).toEqual("Andela Business");
    expect(newState.businesses[0].image).toEqual("jdnwyjyoiarkt47hdjjdghmxbia");
    expect(newState.businesses[0].details).toEqual("andela business is awesome");
    expect(newState.businesses[0].categoryId).toEqual(4);
  });
  it('should get all business categories when passed with GET_ALL_CATEGORY', () => {
    const initialState = {
      categories: []
    };
    const { allCategories } = MockData;
    const action = {
      type: GET_ALL_CATEGORY,
      categories: allCategories.Categories
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.categories[0].id).toEqual(1);
    expect(newState.categories[0].category).toEqual("food");
    expect(newState.categories[1].id).toEqual(2);
    expect(newState.categories[1].category).toEqual("fashion");
    expect(newState.categories[2].id).toEqual(3);
    expect(newState.categories[2].category).toEqual("entertainment");
    expect(newState.categories[3].id).toEqual(4);
    expect(newState.categories[3].category).toEqual("sports");
    expect(newState.categories[4].id).toEqual(5);
    expect(newState.categories[4].category).toEqual("health");
  });
  it('should get one business when passed with VIEW_BUSINESS', () => {
    const initialState = {
      business: {}
    };
    const { viewBusinessResponse } = MockData;
    const action = {
      type: VIEW_BUSINESS,
      business: viewBusinessResponse.business
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.business.name).toEqual("Andela Card business");
    expect(newState.business.image).toEqual("null");
    expect(newState.business.location).toEqual("KANO");
    expect(newState.business.details).toEqual("andela business is great");
    expect(newState.business.categoryId).toEqual(3);
  });
  it('should get all user business when passed with EDIT_BUSINESS', () => {
    const initialState = {
      business: {}
    };
    const { editedBusinessDetails } = MockData;
    const action = {
      type: EDIT_BUSINESS,
      business: editedBusinessDetails
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.business.name).toEqual("Andela Card business");
    expect(newState.business.image).toEqual("jfjubvubbbbbgbbdhbfhuyf");
    expect(newState.business.location).toEqual("KANO");
    expect(newState.business.details).toEqual("andela business is great");
    expect(newState.business.categoryId).toEqual(5);
  });
  it('should delete business when passed with DELETE_BUSINESS', () => {
    const { businessId, getBusinessDetails } = MockData;
    const initialState = {
      businesses: getBusinessDetails.businesses.rows
    };
    const action = {
      type: DELETE_BUSINESS,
      businessId: businessId
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.businesses.length).toEqual(2);
  });
  it('should search for business when passed with SEARCH_BUSINESS', () => {
    const { getBusinessDetails } = MockData;
    const initialState = {
      businesses: [],
    };
    const action = {
      type: SEARCH_BUSINESS,
      result: getBusinessDetails.businesses
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.businesses[0].name).toEqual("Andela Business");
    expect(newState.businesses[0].image).toEqual("jdnwyjyoiarkt47hdjjdghmxbia");
    expect(newState.businesses[0].details).toEqual("andela business is awesome");
    expect(newState.businesses[0].categoryId).toEqual(4);
    expect(newState.businesses[0].location).toEqual("LAGOS");
  });
  it('should search for business when passed with SEARCH_USER_BUSINESS', () => {
    const { getBusinessDetails } = MockData;
    const initialState = {
      userBusiness: []
    };
    const action = {
      type: SEARCH_USER_BUSINESS,
      result: getBusinessDetails.businesses
    };
    const newState = BusinessReducer(initialState, action);
    expect(newState.userBusiness[0].name).toEqual("Andela Business");
    expect(newState.userBusiness[0].image).toEqual("jdnwyjyoiarkt47hdjjdghmxbia");
    expect(newState.userBusiness[0].details).toEqual("andela business is awesome");
    expect(newState.userBusiness[0].categoryId).toEqual(4);
    expect(newState.userBusiness[0].location).toEqual("LAGOS");
  });
});
