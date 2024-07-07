<script setup>
import { useGraphStore } from '@/stores/graph'
import InputSelect from './common/InputSelect.vue'
import { computed } from 'vue'
import conventions from '@/constants/conventions'

const conventionOptions = computed(() =>
  Object.entries(conventions).map(([key, value]) => ({
    text: key,
    value
  }))
)

const store = useGraphStore()

function reset() {
  store.reset()
}
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <h1 class="font-bold">Cyclic Voltammetry Simulator</h1>
    <div class="ml-auto flex gap-4">
      <InputSelect v-model="store.convention" :options="conventionOptions" label="Convention:" />
      <button @click="reset()">Reset</button>
    </div>
  </div>
</template>
