/**
 * App React Container Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 * Container Component Docs - https://css-tricks.com/learning-react-container-components/
 */

import '../../styles/containers/Layout.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className="page-container">
        <Header />
        <main role="main" className="main-content">
          {this.props.children}
        </main>
        <Footer />
      </div>
    );
  }
}

export default Layout;
