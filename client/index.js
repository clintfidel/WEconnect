import React from 'react';
import jwtDecode from 'jwt-decode';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './public/styles/style.scss';
import setAuthorizationToken from './utils/authorization';
import { SET_CURRENT_USER } from './actions/types';
import configureStore from './store/configureStore';
import Routes from './routes/index';


const store = configureStore();
const token = localStorage.getItem('token');

if (token) {
  setAuthorizationToken(token);
  store.dispatch({
    type: SET_CURRENT_USER,
    user: jwtDecode(token),
    authenticated: true
  });
}

render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.getElementById('app')
);
