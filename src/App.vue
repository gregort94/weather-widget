<template>
  <v-card
    class="fixed right-0 top-0 w-[300px]"
    elevation="5"
  >
    <v-layout full-height>
      <v-app-bar
        absolute
        color="background"
        elevation="1"
      >
        <v-toolbar-title>{{ isSettingsOpen ? 'Settings' : activeLocation?.name }}</v-toolbar-title>
        <v-app-bar-nav-icon
          :icon="isSettingsOpen ? 'mdi-window-close' : '$menu'"
          variant="text"
          @click.stop="isSettingsOpen = !isSettingsOpen"
        ></v-app-bar-nav-icon>
      </v-app-bar>

      <v-main class="h-full min-h-[200px]">
        <AppSettings v-if="isSettingsOpen"></AppSettings>
        <div v-else>
          <LocationWeatherCard v-if="!!activeLocation"></LocationWeatherCard>
          <div v-else class="w-full h-full flex items-center justify-center">
            <v-btn @click="isSettingsOpen = true">go to settings</v-btn>
          </div>
          <v-overlay
            :model-value="isPermissionState"
            class="align-center justify-center"
            contained
          >
            <v-sheet
              class="pa-4 text-center mx-auto"
              width="100%"
            >
              <v-icon icon="mdi-alert-box" size="x-large"></v-icon>
              <p class="font-weight-medium text-center">
                To retrieve your current location, give your browser permission
              </p>
            </v-sheet>
          </v-overlay>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import AppSettings from '@/components/AppSettings.vue';
import LocationWeatherCard from '@/components/LocationWeatherCard.vue';
import {useMainStore} from "@/store";
import {storeToRefs} from "pinia";
import {ref} from "vue";

const store = useMainStore()
const {activeLocation, isPermissionState} = storeToRefs(store)
const {getUserLocation} = store

const isSettingsOpen = ref(false)

if (!activeLocation) {
  getUserLocation();
}
</script>
