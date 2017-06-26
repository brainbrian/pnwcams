/**
 * Redux Store
 * http://redux.js.org/docs/basics/Store.html
 * Example - https://github.com/reactjs/redux/blob/master/examples/universal/common/store/configureStore.js
 * More Examples - https://github.com/reactjs/redux/blob/master/docs/introduction/Examples.md
 */

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger({collapsed: true}));
}

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
