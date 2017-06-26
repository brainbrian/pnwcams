/**
 * Redux Reducers
 * Combines all reducers used within app
 * http://redux.js.org/docs/basics/Reducers.html
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ui from './ui';
import locations from './locations';

const rootReducer = combineReducers({
  routing: routerReducer,
  ui,
  locations
});

export default rootReducer;
