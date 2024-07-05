<script setup>
const props = defineProps({
  modelValue: [String, Number],
  label: String,
  min: [String, Number],
  max: [String, Number],
  step: [String, Number]
})

function transformValue(value) {
  return Number(Number(value).toExponential(5))
}
</script>

<template>
  <div class="flex max-sm:flex-col sm:gap-4">
    <label class="w-80" v-html="props.label" />
    <div class="flex gap-4 w-full">
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="modelValue"
        class="w-full"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <input
        type="number"
        :value="transformValue(modelValue)"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        class="border border-black rounded w-48 px-1"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>
