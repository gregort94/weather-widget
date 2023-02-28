import axios from 'axios';
import {Coords, Location} from '@/types';
const API_KEY = '29fd7e653588bce9bca81b726eb8de1c'
const BASE_URL = 'http://api.openweathermap.org/'

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
  }
})
weatherApi.interceptors.response.use(
    (response) => response.data, (error) => Promise.reject(error)
)

export const fetchLocationsByCoords = ({lat, lon}: Coords): Promise<Location[]> => {
  return weatherApi.get('geo/1.0/reverse', {
    params: {
      lat,
      lon,
      limit: 1
    }
  })
}

export const fetchLocationWeatherByCoords = ({lat, lon}: Coords): Promise<any> => {
  return weatherApi.get('data/2.5/weather', {
    params: {
      lat,
      lon,
    }
  })
}
