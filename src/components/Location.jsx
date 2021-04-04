import React from 'react';
import PropTypes from 'prop-types';

import Cameras from './Cameras';
import TitleCard from './TitleCard';

import '../styles/components/Location.scss';

const Location = ({ cameras, latitude, longitude, link, name, weather }) => (
    <div className="location">
        <TitleCard
            name={name}
            link={link}
            latitude={latitude}
            longitude={longitude}
            weather={weather}
        />
        <Cameras data={cameras} />
    </div>
);

Location.propTypes = {
    name: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    link: PropTypes.string,
    links: PropTypes.array.isRequired,
    cameras: PropTypes.array.isRequired,
    weather: PropTypes.object.isRequired,
};

export default Location;
