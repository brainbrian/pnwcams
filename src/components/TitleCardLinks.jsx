import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/TitleCard.scss';

const TitleCardLinks = ({ links }) => {
    const linkComponents = links.map((link, index) => {
        const props = {
            id: index,
            key: `link-${index}`,
            url: link.url,
            name: link.name,
        };

        return (
            <li key={props.key}>
                <a
                    href={props.url}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {props.name}
                </a>
            </li>
        );
    });

    return (
        <div className="title-card title-card--links">
            <ul className="title-card__vertical-align">{linkComponents}</ul>
        </div>
    );
};

TitleCardLinks.propTypes = {
    links: PropTypes.array.isRequired,
};

export default TitleCardLinks;
