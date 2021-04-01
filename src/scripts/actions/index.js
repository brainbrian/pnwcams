/**
 * Redux Actions
 * http://redux.js.org/docs/basics/Actions.html
 */

import { hashHistory } from 'react-router';
import fetchJsonp from 'fetch-jsonp';

const DATA_URL = process.env.DATA_URL || '/assets/json/data.json';
const API_URL_SNOW = 'https://forecast.weather.gov/MapClick.php?FcstType=json';
const API_URL_SURF = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=aedd7de81c14d670e877d39ead4ed7b4';

export const LOCATIONS_UPDATE = 'LOCATIONS_UPDATE';
export const LOCATIONS_FAILED = 'LOCATIONS_FAILED';
export const LINKS_UPDATE = 'LINKS_UPDATE';
export const LINKS_FAILED = 'LINKS_FAILED';
export const WEATHER_UPDATE = 'WEATHER_UPDATE';
export const UI_LOADING = 'UI_LOADING';

export const locationsUpdate = (value) => ({
  type: LOCATIONS_UPDATE,
  payload: value
});

export const locationsFailed = () => ({
  type: LOCATIONS_FAILED
});

export const linksUpdate = (value) => ({
  type: LINKS_UPDATE,
  payload: value
});

export const linksFailed = () => ({
  type: LINKS_FAILED
});

export const weatherUpdate = (value) => ({
  type: WEATHER_UPDATE,
  payload: value
});

const uiLoading = (isLoading) => ({
  type: UI_LOADING,
  payload: isLoading
});

export const requireData = (nextState, replace, callback) => {
  return (dispatch) => {
    let cat = 'surf';
    if (
      nextState.location.pathname !== '/snow'
      && nextState.location.pathname !== '/surf'
    ) {
      const currentMonth = new Date().getMonth();
      // set it to snow if we're October - March, otherwise default to surf
      if (currentMonth > 8 || currentMonth < 3) {
        hashHistory.push(`/snow`);
        cat = 'snow';
      } else {
        hashHistory.push(`/surf`);
        cat = 'surf';
      }
    } else if (nextState.location.pathname === '/snow') {
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
        dispatch(linksUpdate({data: json.links}));
        getWeather(json.locations, cat, dispatch);
        callback();
      } else {
        dispatch(locationsFailed());
        dispatch(linksFailed());
      }
      dispatch(uiLoading(false));
    }).catch((reason) => {
      console.log('error', reason);
      dispatch(locationsFailed());
      dispatch(linksFailed());
      dispatch(uiLoading(false));
    });
  };
};

const getWeather = (locations, cat, dispatch) => {
  let baseApiUrl = API_URL_SNOW;
  if (cat === 'surf') baseApiUrl = API_URL_SURF;
  locations.forEach((item, index) => {
    if (item.category === cat) {
      const apiUrl = `${baseApiUrl}&lat=${item.latitude}&lon=${item.longitude}`;
      fetchJsonp(apiUrl).then((response) => {
        return response.json();
      }).then((json) => {
        dispatch(weatherUpdate({index: index, data: json}));
      }).catch((reason) => {
        console.log('error', reason);
      });
    }
  });
};
