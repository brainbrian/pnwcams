/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/Camera.scss';
import React from 'react';
import PropTypes from 'prop-types';

class Camera extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='camera'>
        <div className='camera__image' data-src={this.props.image}></div>
        <img src={this.props.image} />
        {name &&
          <h3 className='camera__title'>
            <span>{this.props.name}</span>
          </h3>
        }
      </div>
    );
  }
}

export default Camera;
