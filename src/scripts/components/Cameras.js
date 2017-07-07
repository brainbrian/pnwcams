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
      arrows: false,
      autoplay: false,
      className: 'cameras',
      dots: cameras.length > 1 ? true : false,
      infinite: false,
      lazyLoad: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      swipe: cameras.length > 1 ? true : false,
    };

    return (
      <ReactSlick {...slickSettings}>
        {cameras}
      </ReactSlick>
    );
  }
}

export default Cameras;
