import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { useWeather } from '../hooks/useWeather';

import '../styles/components/TitleCard.scss';

/**
 * Convert direction in degrees to human readable value
 * @param  {Number} num Direction in degrees
 * @return {String}     String value of direction
 */
function degToCompass(num) {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = [
        'N',
        'NNE',
        'NE',
        'ENE',
        'E',
        'ESE',
        'SE',
        'SSE',
        'S',
        'SSW',
        'SW',
        'WSW',
        'W',
        'WNW',
        'NW',
        'NNW',
    ];

    return arr[val % arr.length];
}

const TitleCard = ({ latitude, link, longitude, name }) => {
    let headingElement = null;

    if (link) {
        headingElement = (
            <h2 className="title-card__title">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    {name}
                </a>
            </h2>
        );
    } else {
        headingElement = <h2 className="title-card__title">{name}</h2>;
    }

    const [weather] = useWeather({ latitude, longitude, category: 'surf' });

    const weatherData = useMemo(() => {
        if (weather === null) {
            return {};
        }

        if (weather.main) {
            // surf weather - openweathermap.org
            return {
                url:
                    weather.coord && weather.coord.lat && weather.coord.lon
                        ? `http://forecast.weather.gov/MapClick.php?lat=${weather.coord.lat}&lon=${weather.coord.lon}`
                        : null,
                temp: weather.main.temp | null,
                windSpeed:
                    weather.wind && weather.wind.speed
                        ? weather.wind.speed
                        : null,
                windDirection:
                    weather.wind && weather.wind.deg
                        ? degToCompass(weather.wind.deg)
                        : null,
                rain:
                    weather.rain && weather.rain['3h']
                        ? weather.rain['3h']
                        : null,
                snow:
                    weather.snow && weather.snow['3h']
                        ? weather.snow['3h']
                        : null,
                description:
                    weather.weather &&
                    weather.weather.length > 0 &&
                    weather.weather[0].description
                        ? weather.weather[0].description // or .main (shorter desc)
                        : null,
            };
        } else if (weather.data) {
            // snow weather - forecast.weather.gov
            return {
                url:
                    weather.location &&
                    weather.location.latitude &&
                    weather.location.longitude
                        ? `http://forecast.weather.gov/MapClick.php?lat=${weather.location.latitude}&lon=${weather.location.longitude}`
                        : null,
                temp:
                    weather.weather &&
                    weather.weather.temperature &&
                    weather.weather.temperature.length > 0 &&
                    weather.weather.temperature[0] !== 'NA'
                        ? weather.weather.temperature[0]
                        : null,
                description:
                    weather.weather &&
                    weather.weather.weather &&
                    weather.weather.weather.length > 0
                        ? weather.weather.weather[0]
                        : null,
                windSpeed:
                    weather.currentobservation &&
                    weather.currentobservation.Winds &&
                    weather.currentobservation.Winds !== 'NA'
                        ? weather.currentobservation.Winds
                        : null,
                windDirection:
                    weather.currentobservation.Windd &&
                    weather.currentobservation.Windd !== 'NA'
                        ? degToCompass(weather.currentobservation.Windd)
                        : null,
                elevation:
                    weather.location &&
                    weather.location.elevation &&
                    weather.location.elevation !== 'NA'
                        ? weather.location.elevation
                        : null,
            };
        }
    }, [weather]);

    return (
        <div className="title-card">
            <div className="title-card__vertical-align">
                {headingElement}
                {weatherData.url && (
                    <a
                        href={weatherData.url}
                        className="weather-data"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <ul>
                            {weatherData.temp && (
                                <li>
                                    {weatherData.temp} <small>°f</small>
                                </li>
                            )}
                            {weatherData.windSpeed && (
                                <li>
                                    {weatherData.windSpeed} <small>mph</small>
                                    {weatherData.windDirection && (
                                        <span>
                                            {' '}
                                            {weatherData.windDirection}
                                        </span>
                                    )}
                                    <small> wind</small>
                                </li>
                            )}
                            {weatherData.elevation && (
                                <li>
                                    {weatherData.elevation}'{' '}
                                    <small>Elevation</small>
                                </li>
                            )}
                            {weatherData.clouds && (
                                <li>{weatherData.clouds}</li>
                            )}
                        </ul>
                        {weatherData.url && <p>{weatherData.description}</p>}
                    </a>
                )}
            </div>
        </div>
    );
};

TitleCard.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.string,
    weather: PropTypes.object,
};

export default TitleCard;
