'use client';

import { useMemo } from 'react';
import { useWeather } from '../hooks/useWeather';
import { degToCompass } from '../lib/utils';
import type { ProcessedWeatherData, SurfWeatherData, SnowWeatherData } from '../types';

interface TitleCardProps {
  name: string;
  latitude: string;
  longitude: string;
  link?: string;
  category: 'surf' | 'snow';
}

export default function TitleCard({
  latitude,
  link,
  longitude,
  name,
  category,
}: TitleCardProps) {
  const [weather] = useWeather({ latitude, longitude, category });

  const weatherData = useMemo((): ProcessedWeatherData | null => {
    if (weather === null) {
      return null;
    }

    const surfWeather = weather as SurfWeatherData;
    const snowWeather = weather as SnowWeatherData;

    if (surfWeather.main) {
      // surf weather - openweathermap.org
      return {
        url:
          surfWeather.coord && surfWeather.coord.lat && surfWeather.coord.lon
            ? `http://forecast.weather.gov/MapClick.php?lat=${surfWeather.coord.lat}&lon=${surfWeather.coord.lon}`
            : null,
        temp: surfWeather.main.temp || null,
        windSpeed:
          surfWeather.wind && surfWeather.wind.speed
            ? surfWeather.wind.speed
            : null,
        windDirection:
          surfWeather.wind && surfWeather.wind.deg
            ? degToCompass(surfWeather.wind.deg)
            : null,
        rain:
          surfWeather.rain && surfWeather.rain['3h']
            ? surfWeather.rain['3h']
            : null,
        snow:
          surfWeather.snow && surfWeather.snow['3h']
            ? surfWeather.snow['3h']
            : null,
        description:
          surfWeather.weather &&
          surfWeather.weather.length > 0 &&
          surfWeather.weather[0].description
            ? surfWeather.weather[0].description
            : null,
      };
    } else if (snowWeather.data) {
      // snow weather - forecast.weather.gov
      return {
        url:
          snowWeather.location &&
          snowWeather.location.latitude &&
          snowWeather.location.longitude
            ? `http://forecast.weather.gov/MapClick.php?lat=${snowWeather.location.latitude}&lon=${snowWeather.location.longitude}`
            : null,
        temp:
          snowWeather.weather &&
          snowWeather.weather.temperature &&
          snowWeather.weather.temperature.length > 0 &&
          snowWeather.weather.temperature[0] !== 'NA'
            ? snowWeather.weather.temperature[0]
            : null,
        description:
          snowWeather.weather &&
          snowWeather.weather.weather &&
          snowWeather.weather.weather.length > 0
            ? snowWeather.weather.weather[0]
            : null,
        windSpeed:
          snowWeather.currentobservation &&
          snowWeather.currentobservation.Winds &&
          snowWeather.currentobservation.Winds !== 'NA'
            ? snowWeather.currentobservation.Winds
            : null,
        windDirection:
          snowWeather.currentobservation &&
          snowWeather.currentobservation.Windd &&
          snowWeather.currentobservation.Windd !== 'NA'
            ? degToCompass(Number(snowWeather.currentobservation.Windd))
            : null,
        elevation:
          snowWeather.location &&
          snowWeather.location.elevation &&
          snowWeather.location.elevation !== 'NA'
            ? snowWeather.location.elevation
            : null,
      };
    }

    return null;
  }, [weather]);

  return (
    <div className="bg-[#b9e3ff] table h-[170px] sm:h-[250px] relative text-center w-full">
      <div className="table-cell align-middle">
        {link ? (
          <h2 className="text-[#5c717f] font-oswald text-4xl sm:text-5xl font-normal m-0 mb-1">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#3d4d56] no-underline"
            >
              {name}
            </a>
          </h2>
        ) : (
          <h2 className="text-[#5c717f] font-oswald text-4xl sm:text-5xl font-normal m-0 mb-1">
            {name}
          </h2>
        )}
        {weatherData && weatherData.url && (
          <a
            href={weatherData.url}
            className="block opacity-50 text-center no-underline transition-opacity hover:opacity-100 text-[#5c717f] font-oswald text-base sm:text-xl uppercase font-normal"
            target="_blank"
            rel="noreferrer"
          >
            <ul className="list-none m-0 p-0">
              {weatherData.temp && (
                <li className="inline-block px-[10px]">
                  {weatherData.temp} <small className="opacity-50">°f</small>
                </li>
              )}
              {weatherData.windSpeed && (
                <li className="inline-block px-[10px]">
                  {weatherData.windSpeed} <small className="opacity-50">mph</small>
                  {weatherData.windDirection && (
                    <span> {weatherData.windDirection}</span>
                  )}
                  <small className="opacity-50"> wind</small>
                </li>
              )}
              {weatherData.elevation && (
                <li className="inline-block px-[10px]">
                  {weatherData.elevation}&apos;{' '}
                  <small className="opacity-50">Elevation</small>
                </li>
              )}
              {weatherData.clouds && (
                <li className="inline-block px-[10px]">{weatherData.clouds}</li>
              )}
            </ul>
            {weatherData.description && (
              <p className="my-[5px] opacity-70 capitalize">
                {weatherData.description}
              </p>
            )}
          </a>
        )}
      </div>
    </div>
  );
}

