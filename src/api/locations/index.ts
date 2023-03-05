import axios from 'axios';
import {LocationsApiLocation} from '@/types';

const API_KEY = '3cf63826c6mshb1f89008f151922p19100djsnffae152f57aa'
const BASE_URL = 'https://wft-geo-db.p.rapidapi.com/v1/'
const HOST = 'wft-geo-db.p.rapidapi.com'
export const RATE_LIMIT = 1000
export const ITEMS_PER_PAGE_LIMIT = 10

const locationsApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': HOST
  },
  params: {
    limit: ITEMS_PER_PAGE_LIMIT
  }
})
locationsApi.interceptors.response.use(
  (response) => response.data, (error) => Promise.reject(error)
)

export const fetchLocations = (query): Promise<LocationsApiLocation[]> => {
  return locationsApi.get("geo/cities", {
    params: {
      namePrefix: query,
    }
  }).then((response) => response.data);
}
