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

<script lang="ts" setup>
import {computed, ref} from 'vue'
import {fetchLocations, ITEMS_PER_PAGE_LIMIT, RATE_LIMIT} from '@/api/locations';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {Location} from '@/types';
import AppSelect from "@/components/AppSelect.vue";
import {formatLocationForInput} from "@/utils";

const {selectedLocations} = withDefaults(defineProps<{
    maxOptionsLength?: number
    selectedLocations?: Location[]
  }>(),
  {
    maxOptionsLength: ITEMS_PER_PAGE_LIMIT,
    selectedLocations: () => []
  }
)

const labelField = 'name'
const locationKey = 'name'
const items = ref<Location[]>([])
const isLoading = ref(false)

const selectedLocationsIds = computed(() => selectedLocations.map((location) => location[locationKey]))

const options = computed(() => items.value.map((item) => ({
  ...item,
  $isDisabled: selectedLocationsIds.value.includes(item[locationKey])
})))

const searchAPIDebounced = AwesomeDebouncePromise(fetchLocations, RATE_LIMIT);
const fetchOptions = async (val: string) => {
  isLoading.value = true
  try {
    const apiLocations = await searchAPIDebounced(val)
    items.value = apiLocations.map((location) => formatLocationForInput(location))
  } finally {
    isLoading.value = false
  }
}
const onSearch = (search: string) => {
  search && fetchOptions(search)
}

const emit = defineEmits<{
  (e: 'update:model-value', value: Location): void
}>()
const onInput = (value: Location) => {
  emit("update:model-value", value)
}
</script>
