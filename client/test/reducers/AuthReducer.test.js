import expect from 'expect';
import AuthReducer from '../../reducers/AuthReducer';
import {
  SET_CURRENT_USER,
  USER_PROFILE,
  EDIT_USER_PROFILE,
  IMAGE_UPLOAD
} from '../../actions/types';

describe('Auth Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      authenticated: false,
      user: {
        currentUser: {}
      }
    };
    const action = {
      authenticated: true,
      type: SET_CURRENT_USER,
      user: {
        currentUser: {
          id: 1
        }
      }
    };
    const newState = AuthReducer(initialState, action);
    expect(newState.authenticated).toEqual(true);
    expect(newState.user.currentUser.id).toEqual(1);
  });
  it('should get users profile when passed with USER_PROFILE', () => {
    const initialState = {
      authenticated: false,
      user: {}
    };
    const user = {
      status: "success",
      data: {
        id: 1,
        username: "clintrk",
        fullname: "fidelis clinton",
        email: "clintrk@gmail.com",
        image: "fuy1cchtqwgozpqhrily"
      }
    };
    const action = {
      type: USER_PROFILE,
      profile: user.data
    };

    const newState = AuthReducer(initialState, action);
    expect(newState.user.id).toEqual(1);
    expect(newState.user.username).toEqual("clintrk");
    expect(newState.user.fullname).toEqual("fidelis clinton");
    expect(newState.user.email).toEqual("clintrk@gmail.com");
    expect(newState.user.image).toEqual("fuy1cchtqwgozpqhrily");
  });
  it('should get users profile when passed with EDIT_USER_PROFILE,', () => {
    const initialState = {
      authenticated: false,
      user: {}
    };
    const user = {
      status: "success",
      message: "Profile updated successfully",
      updatedProfile: {
        userId: 1,
        fullname: "Fidelis Clinton",
        username: "clinton",
        email: "clinton@gmail.com",
        image: "fuy1cchtqwgozpqhrily"
      }
    };
    const action = {
      type: EDIT_USER_PROFILE,
      newProfile: user.updatedProfile
    };

    const newState = AuthReducer(initialState, action);
    expect(newState.user.userId).toEqual(1);
    expect(newState.user.username).toEqual("clinton");
    expect(newState.user.fullname).toEqual("Fidelis Clinton");
    expect(newState.user.email).toEqual("clinton@gmail.com");
    expect(newState.user.image).toEqual("fuy1cchtqwgozpqhrily");
  });
});
