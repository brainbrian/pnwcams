/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/Cameras.scss';
import '../../styles/lib/OwlCarousel.scss';
import '../../styles/lib/OwlCarouselTheme.scss';
import React from 'react';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel';
import Camera from './Camera';

class Cameras extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let cameras = null;
    let cameraID = 0;
    cameras = this.props.data.map(camera => {
      const props = {
        id: cameraID,
        key: `loc-${cameraID}`,
        name: camera.name,
        image: camera.url
      };
      cameraID ++;
      return <Camera {...props} />;
    });

    return (
      <OwlCarousel className="cameras owl-theme" items={1} autoplay={false} dots lazyLoad loop>
        {cameras}
      </OwlCarousel>
    );
  }
}

export default Cameras;
