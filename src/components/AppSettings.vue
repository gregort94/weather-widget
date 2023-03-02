<template>
  <v-card :min-height="400" class="d-flex flex-column">
    <v-list>
      <v-list-subheader>Your locations</v-list-subheader>
      <ReorderingList
        v-model="userLocations"
        group="locations"
        item-key="name"
        item-label="name"
      ></ReorderingList>
    </v-list>
    <v-spacer></v-spacer>
    <v-card-actions class="flex flex-col items-start">
      <v-label>Add location:</v-label>
      <LocationSelect
        :selectedLocations="userLocations"
        @update:model-value="addLocation"
      ></LocationSelect>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import {useMainStore} from '@/store';
import LocationSelect from '@/components/LocationSelect.vue';
import ReorderingList from "@/components/ReorderingList.vue";
import {storeToRefs} from "pinia";

const store = useMainStore()
const {userLocations} = storeToRefs(store)

const addLocation = (location) => {
  userLocations.value.push(location)
}
</script>
