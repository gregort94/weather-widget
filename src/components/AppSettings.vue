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
      <LocationSelect :selectedLocations="userLocations" @input="addLocation"></LocationSelect>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapWritableState} from 'pinia';
import {useMainStore} from '@/store';
import LocationSelect from '@/components/LocationSelect.vue';
import ReorderingList from "@/components/ReorderingList.vue";

export default defineComponent({
  components: {
    LocationSelect,
    ReorderingList
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapWritableState(useMainStore, ['userLocations']),
    activeLocation() {
      // @ts-ignore
      return this.userLocations[0]
    }
  },
  methods: {
    addLocation(location) {
      // @ts-ignore
      this.userLocations.push(location)
    }
  }
})
</script>
