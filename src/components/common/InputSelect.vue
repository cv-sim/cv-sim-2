<script setup>
const props = defineProps({
  label: String,
  modelValue: [String, Number],
  options: Array
})
</script>

<template>
  <div class="flex max-md:flex-wrap gap-4">
    <label v-html="props.label" />
    <select
      :value="props.modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full"
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
