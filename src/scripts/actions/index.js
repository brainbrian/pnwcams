/**
 * Redux Actions
 * http://redux.js.org/docs/basics/Actions.html
 */

import { hashHistory } from 'react-router';

const DATA_URL = process.env.DATA_URL || '/assets/json/data.json';

export const LOCATIONS_UPDATE = 'LOCATIONS_UPDATE';
export const LOCATIONS_FAILED = 'LOCATIONS_FAILED';
export const UI_LOADING = 'UI_LOADING';

export const locationsUpdate = (value) => ({
  type: LOCATIONS_UPDATE,
  payload: value
});

export const locationsFailed = () => ({
  type: LOCATIONS_FAILED
});

const uiLoading = (isLoading) => ({
  type: UI_LOADING,
  payload: isLoading
});

export const requireData = (nextState, replace, callback) => {
  return (dispatch) => {
    if (
      nextState.location.pathname !== '/'
      && nextState.location.pathname !== '/snow'
      && nextState.location.pathname !== '/surf'
    ) {
      hashHistory.push(`/`);
    }
    // update locations with current category
    let cat = 'surf';
    if (nextState.location.pathname === '/snow') {
      cat = 'snow';
    }
    dispatch(locationsUpdate({category: cat}));

    const getData = new Request(DATA_URL, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'default'
    });
    // check user
    dispatch(uiLoading(true));
    fetch(getData).then((response) => {
      return response.json();
    }).then((json) => {
      if(json && json.locations) {
        dispatch(locationsUpdate({data: json.locations}));
        callback();
      } else {
        dispatch(locationsFailed());
      }
      dispatch(uiLoading(false));
    }).catch((reason) => {
      console.log('error', reason);
      dispatch(locationsFailed());
      dispatch(uiLoading(false));
    });
  };
};
