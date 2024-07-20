<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  options: Array
})

const id = ref(Math.random().toString(36).substring(2, 7))
</script>

<template>
  <div class="flex max-md:flex-wrap gap-4">
    <label :for="id" v-html="props.label" class="self-center" />
    <select
      :id="id"
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-32"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        v-text="option.text"
        :value="option.value"
      />
    </select>
    <slot name="after-select" />
  </div>
</template>
