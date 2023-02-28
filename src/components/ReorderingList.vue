<template>
  <draggable v-bind="dragOptions">
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
  </draggable>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    draggable,
  },
  props: {
    itemLabel: {
      type: String as PropType<string>,
      required: true
    },
  },
  data() {
    return {}
  },
  computed: {
    dragOptions() {
      return {
        animation: 250,
        disabled: false,
        ghostClass: "ghost"
      };
    },
  },
  methods: {
    onItemClick(element, idx) {
      // @ts-ignore
      const array = this.$attrs.modelValue.slice()
      array.splice(idx, 1)
      // @ts-ignore
      array.unshift(element)
      this.$emit('update:modelValue', array)
    },
    onDeleteClick(idx) {
      // @ts-ignore
      const array = this.$attrs.modelValue.slice()
      array.splice(idx, 1)
      this.$emit('update:modelValue', array)
    }
  }
})
</script>

<style>
.ghost {
  opacity: 0.4;
}
</style>
