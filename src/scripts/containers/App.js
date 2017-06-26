/**
 * App React Container Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 * Container Component Docs - https://css-tricks.com/learning-react-container-components/
 */

import React from 'react';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import Preload from 'react-preload';
import Preloader from '../components/Preloader';
import routes from '../routes';

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const { history, store } = this.props;
    // preloader animation
    const prelaoder = (
      <Preloader />
    );
    // assets to preload
    const preloadImages = [];

    return (
      <Preload loadingIndicator={prelaoder} images={preloadImages} resolveOnError={true} mountChildren={true}>
          <Router routes={routes(store)} history={history} onUpdate={() => window.scrollTo(0, 0)} />
      </Preload>
    );
  }
}

export default App;
