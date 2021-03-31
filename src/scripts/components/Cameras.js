import React from "react";
import PropTypes from "prop-types";
import ReactSlick from "react-slick";

import Camera from "./Camera";

import "../../styles/components/Cameras.scss";

class Cameras extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  render() {
    const cameras = this.props.data.map((camera, key) => {
      const props = {
        id: key,
        key: `loc-${key}`,
        name: camera.name,
        image: camera.image,
        iframe: camera.iframe,
        youtube: camera.youtube,
      };

      return (
        <div key={props.key}>
          <Camera {...props} />
        </div>
      );
    });

    const slickSettings = {
      arrows: false,
      autoplay: false,
      className: "cameras",
      dots: cameras.length > 1 ? true : false,
      infinite: false,
      lazyLoad: true,
      slidesToScroll: 1,
      slidesToShow: 1,
      swipe: cameras.length > 1 ? true : false,
    };

    return <ReactSlick {...slickSettings}>{cameras}</ReactSlick>;
  }
}

export default Cameras;
