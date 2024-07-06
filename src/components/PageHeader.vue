<script setup>
import { useGraphStore } from '@/stores/graph'

const store = useGraphStore()

function reset() {
  store.reset()
}
</script>

<template>
  <div class="flex">
    <h1 class="font-bold">Cyclic Voltammetry Simulator</h1>
    <button class="ml-auto" @click="reset()">Reset</button>
  </div>
</template>
