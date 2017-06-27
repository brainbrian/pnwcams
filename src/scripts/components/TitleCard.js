/**
 * Form Input React Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 */

import '../../styles/components/TitleCard.scss';
import React from 'react';
import PropTypes from 'prop-types';

class TitleCard extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let heading = null;
    if (this.props.link) {
      heading = <h2 className="title-card__title"><a href="{this.props.link}" target="_blank" rel="noopener noreferrer">{this.props.name}</a></h2>;
    } else {
      heading = <h2 className="title-card__title">{this.props.name}</h2>;
    }

    return (
      <div className="title-card">
          <div className="title-card__vertical-align">
            {heading}
          </div>
      </div>
    );
  }
}

export default TitleCard;
