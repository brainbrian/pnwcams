/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/Camera.scss';
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Camera extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    youtubeId: PropTypes.string,
    name: PropTypes.string
  };

  randomImage(img) {
    img = img.indexOf("?") > -1 ? `${img}&` : `${img}?`;
    img += `random=${Math.round(Math.random() * 100000000)}`;
    return img;
  }

  render() {
    const {image, name, youtubeId} = this.props;

    return <div className="camera">
        {image && <img className="camera__image" src={this.randomImage(image)} />}
        {youtubeId && <iframe className="camera__iframe" type="text/html" src={`http://www.youtube.com/embed/${youtubeId}?controls=0&color=white&modestbranding=1&playsinline=1`} frameBorder="0" />}
      {name && <h3 className={cx('camera__title', {'camera__title--video': youtubeId})}>
            <span>{name}</span>
          </h3>}
      </div>;
  }
}

export default Camera;
