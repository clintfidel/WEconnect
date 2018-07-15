import configureMockStore from 'redux-mock-store';
import expect from 'expect';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import jsonwebtoken from 'jsonwebtoken';
import mockLocalStorage from '../mocks/mockLocalStorage';
import mockData from '../mocks/mockData';

import {
  registerAction,
  loginAction,
  editUserProfileAction,
  userProfileAction,
  imageUploadAction,
  logoutAction
} from '../../actions/AuthAction';
import {
  SET_CURRENT_USER,
  USER_LOGOUT,
  USER_PROFILE,
  EDIT_USER_PROFILE,
  IMAGE_UPLOAD
} from '../../actions/types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = mockLocalStorage;

describe('Auth actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('Signup action creator', () => {
    it(
      'creats the SET_CURRENT_USER on successful login action ',
      async (done) => {
        const { signupResponse, signupData } = mockData;
        moxios.stubRequest('/api/v1/auth/signup', {
          status: 201,
          response: signupResponse
        });
        const store = mockStore({});
        await store.dispatch(registerAction(signupData))
          .then(() => {
            const signupActionResult = [{
              authenticated: true,
              type: SET_CURRENT_USER,
              user: jsonwebtoken.decode(signupResponse.token)
            }];
            expect(store.getActions()).toEqual(signupActionResult);
          });
        done();
      }
    );
  });

  describe('login action creator', () => {
    it(
      'creats the SET_CURRENT_USER on successful login action ',
      async (done) => {
        const { loginResponse, loginData } = mockData;
        moxios.stubRequest('/api/v1/auth/login', {
          status: 200,
          response: loginResponse
        });
        const store = mockStore({});
        await store.dispatch(loginAction(loginData))
          .then(() => {
            const signupActionResult = [{
              authenticated: true,
              type: SET_CURRENT_USER,
              user: jsonwebtoken.decode(loginResponse.data.token)
            }];
            expect(store.getActions()).toEqual(signupActionResult);
          });
        done();
      }
    );
  });

  describe('logout action creator', () => {
    it(
      'creats USER_LOGOUT on successful logout action ',
      async (done) => {
        const store = mockStore({});
        await store.dispatch(logoutAction());
        const signupActionResult = [{
          authenticated: false,
          type: USER_LOGOUT,
          user: {}
        }];
        expect(store.getActions()).toEqual(signupActionResult);
        done();
      }
    );
  });

  describe('get USER_PROFILE action creator', () => {
    it(
      'creats the USER_PROFILE on successful getUser profile action ',
      async (done) => {
        const { getUserDetails } = mockData;
        moxios.stubRequest('/api/v1/auth', {
          status: 200,
          response: {
            data: {
              data: {
                userId: 1,
                fullname: 'Clinton Fidelis',
                username: 'clintfidel',
                email: 'clinton.fidelis@andela.com',
                image: null
              }

            }
          }
        });
        const store = mockStore({});
        store.dispatch(userProfileAction())
          .then(() => {
            const getUserDetailsAction = [{
              type: USER_PROFILE,
              profile: getUserDetails
            }];
            expect(store.getActions()).toEqual(getUserDetailsAction);
          });
        done();
      }
    );
  });

  describe('editUserrProfile action creator', () => {
    it(
      'creats the EDIT_USER_PROFILE on successful login action ',
      async (done) => {
        const { editprofileResponse, editedUserDetails } = mockData;
        moxios.stubRequest('/api/v1/auth/editprofile', {
          status: 200,
          response: editprofileResponse
        });
        const store = mockStore({});
        await store.dispatch(editUserProfileAction(editprofileResponse))
          .then(() => {
            const editProfileActionResult = [{
              type: EDIT_USER_PROFILE,
              newProfile: editedUserDetails
            }];
            expect(store.getActions()).toEqual(editProfileActionResult);
          });
        done();
      }
    );
  });
  describe('save image to cloudinary action creator', () => {
    it(
      'creates SAVE_PROFILE_IMAGE when edit profile action is successful',
      async (done) => {
        process.env.CLOUD_API = 'https://api.cloudinary.com/v1_1/clintfidel/eghdjdjf/upload';
        const request = process.env.CLOUD_API;
        const { imageResponse, uploadImage } = mockData;
        moxios.stubRequest(request, {
          status: 200,
          response: imageResponse
        });
        const expectedActions = [{
          type: IMAGE_UPLOAD,
          imageUrl: imageResponse.public_id
        }];
        const store = mockStore({});
        await store.dispatch(imageUploadAction(uploadImage))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
          });
        done();
      }
    );
  });
});
