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
  <div class="sm:flex">
    <label v-text="props.label" class="w-64" />
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
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>
