/**
 * Redux Actions
 * http://redux.js.org/docs/basics/Actions.html
 */

export const UI_LOADING = 'UI_LOADING';
export const LOCATIONS_UPDATE = 'LOCATIONS_UPDATE';
export const LOCATIONS_FAILED = 'LOCATIONS_FAILED';

const uiLoading = (isLoading) => ({
  type: UI_LOADING,
  payload: isLoading
});

export const locationsUpdate = (value) => ({
  type: LOCATIONS_UPDATE,
  payload: value
});

export const locationsFailed = () => ({
  type: LOCATIONS_FAILED
});

export const requireData = (nextState, replace, callback) => {
  return (dispatch) => {
    const getData = new Request(`/assets/json/data.json`, {
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
        dispatch(locationsUpdate(json.locations));
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
