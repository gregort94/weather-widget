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

<script lang="ts" setup>
import {useMainStore} from '@/store';
import {computed, onBeforeUnmount, ref} from "vue";
import {storeToRefs} from "pinia";

const UPDATE_INTERVAL = 1000 * 60 * 10 // 10 minutes

const store = useMainStore()
const {activeLocationWeather, activeLocation} = storeToRefs(store)
const {fetchLocationWeather} = store

let isLoading = ref(false)
let intervalId: any = null

const getTemperature = computed(() => activeLocationWeather.value
  ? Math.round(activeLocationWeather.value?.temperature.main - 273.15)
  : null
)
const getWindSpeed = computed(() => activeLocationWeather.value?.wind.speed)
const getHumidity = computed(() => activeLocationWeather.value?.humidity)
const getBrief = computed(() => activeLocationWeather.value?.brief)

const updateWeather = async () => {
  isLoading.value = true
  try {
    await fetchLocationWeather()
  } finally {
    isLoading.value = false
  }
}

if (activeLocation) {
  updateWeather()
  intervalId = setInterval(updateWeather, UPDATE_INTERVAL)
}

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>
