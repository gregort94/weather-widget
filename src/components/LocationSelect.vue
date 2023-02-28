<template>
  <AppSelect
    :internal-search="false"
    :label="labelField"
    :loading="isLoading"
    :max-height="200"
    :options="options"
    :trackBy="locationKey"
    open-direction="top"
    placeholder="Type to search"
    searchable
    @select="onInput"
    @search-change="onSearch"
  >
  </AppSelect>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {fetchLocations, ITEMS_PER_PAGE_LIMIT, RATE_LIMIT} from '@/api/locations';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {LocationsApiLocation, Location} from '@/types';

const searchAPIDebounced = AwesomeDebouncePromise(fetchLocations, RATE_LIMIT);
import AppSelect from "@/components/AppSelect.vue";

const formatLocationForInput = (apiLocation: LocationsApiLocation): Location => {
  return {
    name: apiLocation.name,
    lat: apiLocation.latitude,
    lon: apiLocation.longitude,
    country: apiLocation.country,
    state: apiLocation.region
  }
}

export default defineComponent({
  inheritAttrs: false,
  components: {AppSelect},
  props: {
    maxOptionsLength: {
      type: Number,
      default: ITEMS_PER_PAGE_LIMIT
    },
    selectedLocations: {
      type: Array as PropType<Location[]>,
      default: () => []
    }
  },
  data() {
    return {
      search: '',
      isLoading: false,
      items: [] as Location[],
      labelField: 'name',
      locationKey: 'name'
    }
  },
  computed: {
    options() {
      return this.items.map((item) => ({
        ...item,
        $isDisabled: this.selectedLocationsIds.includes(item[this.locationKey])
      }))
    },
    selectedLocationsIds(): number[] {
      return this.selectedLocations.map((location) => location[this.locationKey])
    }
  },
  methods: {
    async fetchOptions(val: string) {
      this.isLoading = true
      const apiLocations = await searchAPIDebounced(val)
      this.items = apiLocations.map((location) => formatLocationForInput(location))
      this.isLoading = false
    },
    onSearch(search: string) {
      search && this.fetchOptions(search)
    },
    onInput(value: Location) {
      this.$emit('input', value)
    },
  },
})
</script>
