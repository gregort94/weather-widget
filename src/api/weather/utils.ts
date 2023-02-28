import {LocationWeather} from '@/types';

export const formatWeatherForInput = (payload): LocationWeather => {
  return {
    temperature: {
      main: payload.main.temp
    },
    wind: {
      speed: payload.wind.speed
    },
    humidity: payload.main.humidity,
    brief: {
      description: payload.weather[0].description,
      iconUrl: `http://openweathermap.org/img/wn/${payload.weather[0].icon}@2x.png`
    }
  }
}
