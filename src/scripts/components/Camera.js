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
    this.state = {
      image: this.randomImage(this.props.image),
    };
  }

  randomImage(img) {
    img = img.indexOf('?') > -1 ? `${img}&` : `${img}?`;
    img += `random=${Math.round(Math.random() * 100000000)}`;
    return img;
  }

  render() {
    return (
      <div className='camera'>
        <img className='camera__image' src={this.state.image} />
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
