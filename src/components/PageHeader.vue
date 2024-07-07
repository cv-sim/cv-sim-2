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
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <h1 class="font-bold">Cyclic Voltammetry Simulator</h1>
    <div class="ml-auto flex gap-4">
      <InputSelect v-model="store.convention" :options="conventionOptions" label="Convention:" />
      <button @click="() => store.reset()">
        <FontAwesomeIcon icon="rotate-left" class="mr-1" />
        Reset
      </button>
      <button @click="() => store.export()">
        <FontAwesomeIcon icon="file-export" class="mr-1" />
        Export
      </button>
    </div>
  </div>
</template>
