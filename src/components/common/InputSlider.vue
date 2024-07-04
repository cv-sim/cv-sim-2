<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  min: [String, Number],
  max: [String, Number],
  step: [String, Number]
})
</script>

<template>
  <div class="sm:flex gap-x-4">
    <label class="text-nowrap w-60" v-html="props.label" />
    <input
      type="range"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      type="number"
      :value="modelValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="border border-black rounded w-24"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
