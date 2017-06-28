/**
 * Redux Reducers
 * http://redux.js.org/docs/basics/Reducers.html
 */

import { LOCATIONS_UPDATE, LOCATIONS_FAILED , WEATHER_UPDATE } from '../actions';

const locations = (state = {}, action) => {
  switch (action.type) {
    case LOCATIONS_UPDATE:
      return Object.assign({}, state, action.payload);
    case LOCATIONS_FAILED:
      return Object.assign({}, state, {
        status: 'failure'
      });
    case WEATHER_UPDATE:
      const index = action.payload.index;
      const data = action.payload.data;
      const stateUpdated = Object.assign({}, state, {});
      stateUpdated.data[index] = Object.assign({}, stateUpdated.data[index], {weather: data});
      return stateUpdated;
    default:
      return state;
  }
};

export default locations;
