import {defineStore} from 'pinia';
import {RemovableRef, useStorage} from '@vueuse/core'
import {getPosition} from '@/utils';
import {Coords, LocationWeather, Location} from '@/types';
import {fetchLocationsByCoords, fetchLocationWeatherByCoords} from '@/api/weather';
import {formatWeatherForInput} from '@/api/weather/utils';

interface State {
  userCoords: Coords,
  userLocations: RemovableRef<Location[]>,
  isPermissionState: Boolean,
  activeLocationWeather: LocationWeather
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    userCoords: null,
    userLocations: useStorage('userLocations', []),
    isPermissionState: false,
    activeLocationWeather: null
  }),
  getters: {
    activeLocation: (state) => state.userLocations?.[0]
  },
  actions: {
    async getUserLocation() {
      await this.getCoords()
      this.fetchUserLocation()
    },
    async getCoords() {
      this.isPermissionState = true
      try {
        const {coords: {latitude, longitude}} = await getPosition()
        this.userCoords = {lat: latitude, lon: longitude}
      } finally {
        this.isPermissionState = false
      }
    },
    async fetchUserLocation() {
      const data = await fetchLocationsByCoords(this.userCoords)
      this.userLocations.push(data[0])
    },
    async fetchLocationWeather() {
      const data = await fetchLocationWeatherByCoords(this.activeLocation)
      this.activeLocationWeather = formatWeatherForInput(data)
    }
  },
})
