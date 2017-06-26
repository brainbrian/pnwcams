
/**
 * React Router Routes Configuration
 * https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { requireData } from './actions/';
import Layout from './containers/Layout';
import Category from './containers/Category';
// import About from './containers/About';
import NotFound from './containers/NotFound';

const Routes = (store) => {
  const checkData = (nextState, replace, callback) => {
    store.dispatch(requireData(nextState, replace, callback));
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Category} onEnter={checkData} />
      <Route path="/surf" component={Category} onEnter={checkData} />
      <Route path="/snow" component={Category} onEnter={checkData} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};

export default Routes;
