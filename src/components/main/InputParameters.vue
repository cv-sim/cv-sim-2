<script setup>
import { useGraphStore } from '@/stores/graph'
import InputSlider from '@/components/common/InputSlider.vue'

const store = useGraphStore()
</script>

<template>
  <div class="min-w-80">
    <InputSlider
      label="Scan Rate (mV/s)"
      min="0"
      max="200"
      step="1"
      v-model="store.selectedParameters.scanRate"
    />
  </div>
</template>
