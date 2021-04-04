import React from 'react';
import PropTypes from 'prop-types';

import Location from '../components/Location';
import TitleCardLinks from '../components/TitleCardLinks';

const Category = ({ links, locations }) => {
    const locationComponents = locations.map((location, index) =>
        location.category === locations.category ? (
            <Location
                id={index}
                key={`loc-${index}`}
                name={location.name}
                latitude={location.latitude}
                longitude={location.longitude}
                link={location.link}
                links={location.links}
                cameras={location.cameras}
                weather={location.weather ? location.weather : {}}
            />
        ) : null,
    );

    return (
        <div>
            <section className="links">
                <TitleCardLinks links={links} />
            </section>
            <section className="locations">{locationComponents}</section>
        </div>
    );
};

Category.propTypes = {
    links: PropTypes.array.isRequired,
    locations: PropTypes.array.isRequired,
};

export default Category;
