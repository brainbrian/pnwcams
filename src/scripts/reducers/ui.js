/**
 * Redux Reducers
 * http://redux.js.org/docs/basics/Reducers.html
 */

import {UI_LOADING} from '../actions';

const ui = (state = {
  loading: false
}, action) => {
  switch (action.type) {
    case UI_LOADING:
      return Object.assign({}, state, {
        loading: action.payload
      });
    default:
      return state;
  }
};

export default ui;
