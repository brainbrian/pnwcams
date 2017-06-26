/**
 * Entry point for React app
 * Creates store and router
 */

import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import App from './containers/App';
import configureStore from './store';

// init store
const store = configureStore({});
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, store);
// get root element of application
const rootElement = document.getElementById('app-root');

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App history={history} store={store} />
    </Provider>
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp history={history} store={store} />
        </Provider>
      </AppContainer>,
      rootElement
    );
  });
}
