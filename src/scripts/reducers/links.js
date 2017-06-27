/**
 * Redux Reducers
 * http://redux.js.org/docs/basics/Reducers.html
 */

import { LINKS_UPDATE, LINKS_FAILED } from '../actions';

const locations = (state = {}, action) => {
  switch (action.type) {
    case LINKS_UPDATE:
      return Object.assign({}, state, action.payload);
    case LINKS_FAILED:
      return Object.assign({}, state, {
        status: 'failure'
      });
    default:
      return state;
  }
};

export default locations;
