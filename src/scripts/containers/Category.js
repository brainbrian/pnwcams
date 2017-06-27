/**
 * Category React Container Component
 * React Component Docs - https://facebook.github.io/react/docs/react-component.html
 * Container Component Docs - https://css-tricks.com/learning-react-container-components/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { locationsUpdate } from '../actions';
import Location from '../components/Location';

class Category extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    locations: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let locations = null;
    let locID = 0;
    locations = this.props.locations.data.map(location => {
      const props = {
        id: locID,
        key: `loc-${locID}`,
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        link: location.link,
        links: location.links,
        cameras: location.cameras,
      };
      locID ++;
      let returnComponent = null;
      if (location.category === this.props.locations.category) returnComponent = <Location {...props} />;
      return returnComponent;
    });

    return (
      <div>
        <section className='links'>links here</section>
        <section className='locations'>
          {locations}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(locationsUpdate, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Category));
