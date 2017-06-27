
/**
 * React Router Routes Configuration
 * https://github.com/ReactTraining/react-router/blob/master/docs/guides/RouteConfiguration.md
 */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { requireData } from './actions/';
import Layout from './containers/Layout';
import Category from './containers/Category';

const Routes = (store) => {
  const checkData = (nextState, replace, callback) => {
    store.dispatch(requireData(nextState, replace, callback));
  };

  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={Category} onEnter={checkData} />
      <Route path="*" component={Category} onEnter={checkData} />
    </Route>
  );
};

export default Routes;
