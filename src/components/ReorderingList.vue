<template>
  <Draggable
    :animation="250"
    :disabled="false"
    :model-value="modelValue"
    ghostClass="ghost"
    @update:modelValue="$emit('update:model-value', $event)"
  >
    <template #item="{element, index}">
      <v-list-item
        :active="index === 0"
        class="group"
        prepend-icon="mdi-drag-horizontal-variant"
        @click="onItemClick(element, index)"
      >
        {{ element[itemLabel] }}
        <template #append>
          <v-icon
            v-show="index === 0"
            class="group-hover:hidden"
            icon="mdi-check-bold"
            size="20"
          ></v-icon>
          <v-btn
            class="hidden group-hover:block"
            icon="mdi-trash-can-outline"
            size="20"
            variant="plain"
            @click="onDeleteClick(index)"
          ></v-btn>
        </template>
      </v-list-item>
    </template>
  </Draggable>
</template>

<script lang="ts" setup>
import Draggable from "vuedraggable";

const props = defineProps<{
  itemLabel: string,
  modelValue: any[]
}>()

const emit = defineEmits<{
  (e: 'update:model-value', value: any[]): void
}>()

const onItemClick = (element, idx) => {
  const array = props.modelValue.slice()
  array.splice(idx, 1)
  array.unshift(element)
  emit('update:model-value', array)
}

const onDeleteClick = (idx) => {
  const array = props.modelValue.slice()
  array.splice(idx, 1)
  emit('update:model-value', array)
}
</script>

<style>
.ghost {
  opacity: 0.4;
}
</style>
