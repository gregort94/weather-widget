<template>
  <v-card :loading="isLoading">
    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          {{ getTemperature }}&deg;C
        </v-col>

        <v-col class="text-right" cols="6">
          <v-tooltip :text="getBrief?.description" location="bottom">
            <template #activator="{ props }">
              <v-avatar
                :image="getBrief?.iconUrl"
                :size="100"
                v-bind="props"
              >
              </v-avatar>
            </template>
          </v-tooltip>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact">
        <template #prepend>
          <v-tooltip text="wind speed">
            <template #activator="{ props }">
              <v-icon
                icon="mdi-weather-windy"
                size="26"
                v-bind="props"></v-icon>
            </template>
          </v-tooltip>
        </template>
        <v-list-item-subtitle>{{ getWindSpeed }} m/s</v-list-item-subtitle>
      </v-list-item>

      <v-list-item density="compact">
        <template #prepend>
          <v-tooltip text="humidity">
            <template #activator="{ props }">
              <v-icon
                icon="mdi-weather-pouring"
                size="26"
                v-bind="props"></v-icon>
            </template>
          </v-tooltip>
        </template>
        <v-list-item-subtitle>{{ getHumidity }}%</v-list-item-subtitle>
      </v-list-item>
    </div>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions, mapState} from 'pinia';
import {useMainStore} from '@/store';
import {WeatherBrief} from '@/types';

const UPDATE_INTERVAL = 1000 * 60 * 10 // 10 minutes

export default defineComponent({
  components: {},
  data() {
    return {
      isLoading: false,
      intervalId: null as number | null,
    }
  },
  computed: {
    ...mapState(useMainStore, ['activeLocationWeather', 'activeLocation']),
    getTemperature(): number {
      return this.activeLocationWeather
        // @ts-ignore
        ? Number.parseInt(this.activeLocationWeather.temperature.main - 273.15)
        : null
    },
    getWindSpeed(): number {
      return this.activeLocationWeather?.wind.speed
    },
    getHumidity(): number {
      return this.activeLocationWeather?.humidity
    },
    getBrief(): WeatherBrief {
      return this.activeLocationWeather?.brief
    }
  },
  created() {
    if (this.activeLocation) {
      this.updateWeather()
      this.intervalId = setInterval(this.updateWeather, UPDATE_INTERVAL)
    }
  },
  methods: {
    ...mapActions(useMainStore, ['fetchLocationWeather']),
    async updateWeather() {
      this.isLoading = true
      try {
        await this.fetchLocationWeather()
      } finally {
        this.isLoading = false
      }
    }
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  }
})
</script>
