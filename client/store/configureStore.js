import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';


// const logger = createLogger();


const middleware = (process.env.NODE_ENV === 'development') ?
  composeWithDevTools(applyMiddleware(thunk)) : applyMiddleware(thunk);

  /* eslint-disable no-underscore-dangle */

/**
 *
 * @description - Redux store configuration
 *
 *
 * @returns {Object} - Object containing data in redux store
 */
export default function configureStore() {
  return createStore(
    rootReducer,
    middleware
  );
}

/* eslint-enable */
