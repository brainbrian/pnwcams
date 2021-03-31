/**
 * Header React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

// import '../../styles/components/Preloader.scss';
import React from "react";
import loadingGif from "../../assets/images/logo-pop-white.svg";

class Preloader extends React.Component {
  render() {
    return (
      <div className="page-overlay">
        <img className="page-overlay-loading" src={loadingGif} alt="loading..." />
      </div>
    );
  }
}

export default Preloader;
