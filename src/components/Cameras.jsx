import React from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

import Camera from './Camera';

import '../styles/components/Cameras.scss';

SwiperCore.use([Pagination]);

const Cameras = ({ data }) => {
    const cameras = data.map((camera, key) => {
        const props = {
            id: key,
            key: `loc-${key}`,
            name: camera.name,
            image: camera.image,
            iframe: camera.iframe,
            youtube: camera.youtube,
        };

        return (
            <SwiperSlide key={props.key}>
                <Camera {...props} />
            </SwiperSlide>
        );
    });

    return (
        <>
            <Swiper pagination={{ clickable: true }} className="cameras">
                {cameras}
            </Swiper>
        </>
    );
};

Cameras.propTypes = {
    data: PropTypes.array.isRequired,
};

export default Cameras;
