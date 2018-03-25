import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';


const logger = createLogger();


const middleware = (process.env.NODE_ENV === 'development') ?
  composeWithDevTools(applyMiddleware(thunk, logger)) : applyMiddleware(thunk);

  /* eslint-disable no-underscore-dangle */

/**
 *
 * @description - Redux store configuration
 *
 * @param {Object}  initialState - inistial state
 *
 * @returns {Object} - Object containing data in redux store
 */
export default function configureStore() {
  return createStore(middleware);
}

/* eslint-enable */
