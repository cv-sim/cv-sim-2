<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  min: [String, Number],
  max: [String, Number],
  step: [String, Number]
})

const id = ref(Math.random().toString(36).substring(2, 7))

function transformValue(value) {
  return Number(Number(value).toExponential(5))
}
</script>

<template>
  <div class="flex max-sm:flex-col sm:gap-4">
    <label :for="id" class="sm:w-96 content-center" v-html="props.label" />
    <div class="flex gap-4 w-full">
      <input
        type="range"
        :min="props.min"
        :max="props.max"
        :step="props.step"
        :value="modelValue"
        class="w-full"
        @input="$emit('update:modelValue', Number($event.target.value))"
      />
      <div>
        <input
          :id="id"
          type="number"
          :value="transformValue(modelValue)"
          :min="props.min"
          :max="props.max"
          :step="props.step"
          class="w-28 self-center"
          @input="$emit('update:modelValue', Number($event.target.value))"
        />
      </div>
    </div>
  </div>
</template>
