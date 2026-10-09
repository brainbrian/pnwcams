'use client';

import { useMemo } from 'react';
import { useWeather } from '../hooks/useWeather';
import {
  CloudIcon,
  ElevationIcon,
  ExternalIcon,
  ThermometerIcon,
  WindIcon,
} from './Icons';
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

  const round = (value: number | string) =>
    typeof value === 'number' ? Math.round(value) : value;

  const stats = weatherData
    ? [
        weatherData.temp != null && {
          key: 'temp',
          Icon: ThermometerIcon,
          value: round(weatherData.temp),
          unit: '°F',
        },
        weatherData.windSpeed != null && {
          key: 'wind',
          Icon: WindIcon,
          value: round(weatherData.windSpeed),
          unit: `mph${weatherData.windDirection ? ` ${weatherData.windDirection}` : ''}`,
        },
        weatherData.elevation && {
          key: 'elevation',
          Icon: ElevationIcon,
          value: `${weatherData.elevation}'`,
          unit: 'elev',
        },
        weatherData.clouds && {
          key: 'clouds',
          Icon: CloudIcon,
          value: weatherData.clouds,
          unit: '',
        },
      ].filter((stat) => !!stat)
    : [];

  return (
    <div className="flex items-start justify-between gap-3 p-4 sm:gap-6 sm:p-6">
      <div className="flex min-w-0 flex-col gap-2">
        <h2 className="m-0 font-display text-2xl font-normal uppercase leading-tight tracking-wide text-foreground sm:text-[2rem]">
          {name}
        </h2>
        {weather === null ? (
          <div className="flex gap-2" aria-hidden="true">
            {[64, 96, 80].map((width) => (
              <span
                key={width}
                className="relative h-7 overflow-hidden rounded-full bg-white/5"
                style={{ width }}
              >
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </span>
            ))}
          </div>
        ) : (
          weatherData && (
            <a
              href={weatherData.url ?? undefined}
              className="group/wx flex flex-wrap items-center gap-2 no-underline"
              target="_blank"
              rel="noreferrer"
              title="View the full forecast at weather.gov"
            >
              {stats.map(({ key, Icon, value, unit }) => (
                <span
                  key={key}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-sm text-foreground transition-colors group-hover/wx:border-accent/30"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span className="font-semibold tabular-nums">{value}</span>
                  {unit && <span className="text-muted">{unit}</span>}
                </span>
              ))}
              {weatherData.description && (
                <span className="text-sm capitalize text-muted transition-colors group-hover/wx:text-foreground">
                  {weatherData.description}
                </span>
              )}
            </a>
          )
        )}
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta inline-flex shrink-0 items-center justify-center gap-1 self-start rounded-xl bg-gradient-to-b from-accent to-accent-strong px-3 py-2 font-display text-xs sm:gap-1.5 sm:px-4 sm:py-2.5 sm:text-sm font-medium uppercase tracking-wider text-[#0b1620] no-underline shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_6px_18px_-6px_rgba(124,196,242,0.6)] transition-all hover:-translate-y-px hover:shadow-[0_1px_0_rgba(255,255,255,0.35)_inset,0_10px_24px_-6px_rgba(124,196,242,0.75)] active:translate-y-0"
          aria-label={`View conditions for ${name}`}
        >
          Conditions
          <ExternalIcon className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
        </a>
      )}
    </div>
  );
}
