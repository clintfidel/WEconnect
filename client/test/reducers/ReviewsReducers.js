// import expect from 'expect';
// import AuthReducer from '../../reducers/AuthReducer';
// import {
//   GET_ALL_REVIEW,
//   ADD_REVIEW,
//   LOAD_MORE_REVIEWS,
//   UPDATE_REVIEW
// } from '../../actions/types';

// describe('Auth Reducer', () => {
//   it('should set the current user when passed with SET_CURRENT_USER', () => {
//     const initialState = {
//       authenticated: false,
//       user: {
//         currentUser: {}
//       }
//     };
//     const action = {
//       authenticated: true,
//       type: SET_CURRENT_USER,
//       user: {
//         currentUser: {
//           id: 1
//         }
//       }
//     };
//     const newState = AuthReducer(initialState, action);
//     expect(newState.authenticated).toEqual(true);
//     expect(newState.user.currentUser.id).toEqual(1);
//   });
// });
