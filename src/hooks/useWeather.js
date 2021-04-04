import { useEffect, useState } from 'react';

const API_URL_SNOW = 'https://forecast.weather.gov/MapClick.php?FcstType=json';
const API_URL_SURF =
    'https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=aedd7de81c14d670e877d39ead4ed7b4';

export function useWeather({ category, latitude, longitude }) {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const baseApiUrl = category === 'surf' ? API_URL_SURF : API_URL_SNOW;
        const apiUrl = `${baseApiUrl}&lat=${latitude}&lon=${longitude}`;

        fetch(apiUrl)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setWeather(json);
            })
            .catch((reason) => {
                console.error(reason);
            });

        return () => {
            setWeather(null);
        };
    }, [category, latitude, longitude]);

    return [weather];
}
