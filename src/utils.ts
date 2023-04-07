import {Location, LocationsApiLocation, TemperatureScale} from "@/types";

export const getPosition = (options?: PositionOptions): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

export const filterByLimit = (inputArray: [], callback: (any) => boolean, limit: number): any[] => {
  const outputArray = [];
  let iterator = 0
  while (iterator < inputArray.length && outputArray.length < limit) {
    const currentValue = inputArray[iterator]
    if (callback(currentValue)) {
      outputArray.push(currentValue)
    }
    iterator++;
  }
  return outputArray
}

export const formatLocationForInput = (apiLocation: LocationsApiLocation): Location => {
  return {
    name: apiLocation.name,
    lat: apiLocation.latitude,
    lon: apiLocation.longitude,
    country: apiLocation.country,
    state: apiLocation.region
  }
}

export const formatKelvinTo = (value: number, scale: TemperatureScale) => {
  switch (scale) {
    case TemperatureScale.Kelvin:
      return value
    case TemperatureScale.Celsius:
      return value - 273.15
    case TemperatureScale.Fahrenheit:
      return (value - 273.15) * 9 / 5 + 32
  }
}
