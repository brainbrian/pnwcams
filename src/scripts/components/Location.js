/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import "../../styles/components/Location.scss";
import React from "react";
import PropTypes from "prop-types";
import TitleCard from "./TitleCard";
import Cameras from "./Cameras";

class Location extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    link: PropTypes.string,
    links: PropTypes.array.isRequired,
    cameras: PropTypes.array.isRequired,
    weather: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="location">
        <TitleCard name={this.props.name} link={this.props.link} latitude={this.props.latitude} longitude={this.props.longitude} weather={this.props.weather} />
        <Cameras data={this.props.cameras} />
      </div>
    );
  }
}

export default Location;
