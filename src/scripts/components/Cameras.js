/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/Cameras.scss';
import React from 'react';
// import PropTypes from 'prop-types';
import Camera from './Camera';

class Cameras extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='cameras owl-carousel owl-theme'>
        <Camera image='http://' name='test camera' />
      </div>
    );
  }
}

export default Cameras;
