/**
 * Redux Reducers
 * http://redux.js.org/docs/basics/Reducers.html
 */

import { LOCATIONS_UPDATE, LOCATIONS_FAILED } from '../actions';

const locations = (state = {}, action) => {
  switch (action.type) {
    case LOCATIONS_UPDATE:
      return Object.assign({}, state, action.payload);
    case LOCATIONS_FAILED:
      return Object.assign({}, state, {
        status: 'failure'
      });
    default:
      return state;
  }
};

export default locations;
