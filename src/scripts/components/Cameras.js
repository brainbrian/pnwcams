/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/Cameras.scss';
import React from 'react';
import PropTypes from 'prop-types';
import ReactSlick from 'react-slick';
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
      return <div key={props.key}><Camera {...props} /></div>;
    });

    const slickSettings = {
      dots: true,
      infinite: true,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
    };

    return (
      <ReactSlick {...slickSettings}>
        {cameras}
      </ReactSlick>
    );
  }
}

export default Cameras;
