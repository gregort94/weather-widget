export interface Coords {
  lat: number
  lon: number
}

export interface LocationsApiLocation {
  type: string
  city: string
  name: string
  country: string
  countryCode: string
  region: string
  regionCode: string
  latitude: number
  longitude: number
}

export interface Location {
  country?: string
  lat: number
  local_names?: { [key: string]: string; }
  lon: number
  state?: string
  name: string
}

export interface WeatherBrief {
  iconUrl: string
  description: string
}

export interface LocationWeather {
  temperature: { main: number }
  wind: { speed: number }
  humidity: number
  brief: WeatherBrief
}
