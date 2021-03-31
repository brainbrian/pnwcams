/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import "../../styles/components/Camera.scss";
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Camera extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    iframe: PropTypes.string,
    name: PropTypes.string,
    youtube: PropTypes.string,
  };

  randomImage(img) {
    if (img.match(/^http.*\.(jpeg|jpg|gif|png)$/) === null) {
      return img;
    }
    img = img.indexOf("?") > -1 ? `${img}&` : `${img}?`;
    img += `random=${Math.round(Math.random() * 100000000)}`;
    return img;
  }

  render() {
    const { image, name, youtube, iframe } = this.props;
    let iframeUrl = "";

    if (youtube) {
      iframeUrl = `https://www.youtube.com/embed/${youtube}?controls=0&color=white&modestbranding=1&playsinline=1`;
    } else if (iframe) {
      iframeUrl = iframe;
    }

    return (
      <div className="camera">
        {image && <img className="camera__image" src={this.randomImage(image)} />}
        {iframeUrl !== "" && <iframe className="camera__iframe" type="text/html" src={iframeUrl} frameBorder="0" scrolling="no" allowFullScreen />}
        {name && (
          <h3 className={cx("camera__title", { "camera__title--video": iframeUrl })}>
            <span>{name}</span>
          </h3>
        )}
      </div>
    );
  }
}

export default Camera;
