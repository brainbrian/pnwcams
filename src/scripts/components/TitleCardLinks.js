/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import "../../styles/components/TitleCard.scss";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { linksUpdate, locationsUpdate } from "../actions";

class TitleCardLinks extends React.Component {
  static propTypes = {
    links: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let links = null;
    let linkID = 0;
    links = this.props.links.data.map((link) => {
      const props = {
        id: linkID,
        key: `link-${linkID}`,
        url: link.url,
        name: link.name,
      };
      linkID++;
      let returnComponent = null;
      if (link.category === this.props.locations.category)
        returnComponent = (
          <li key={props.key}>
            <a href={props.url} className="link" target="_blank" rel="noopener noreferrer">
              {props.name}
            </a>
          </li>
        );
      return returnComponent;
    });

    return (
      <div className="title-card title-card--links">
        <ul className="title-card__vertical-align">{links}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  links: state.links,
  locations: state.locations,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(linksUpdate, locationsUpdate, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TitleCardLinks);
