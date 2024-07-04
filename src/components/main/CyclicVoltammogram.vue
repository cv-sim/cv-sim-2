<script setup>
import { Scatter } from 'vue-chartjs'
import { useGraphStore } from '@/stores/graph.js'
import { reactive, computed } from 'vue'
import { calculateCyclicVoltammogram } from '@/tools/calculations.js'

const store = useGraphStore()

const data = computed(() => ({
  datasets: Object.values(store.datasets).map((dataset) => ({
    label: dataset.title,
    borderColor: dataset.color,
    backgroundColor: dataset.color,
    data: calculateCyclicVoltammogram(dataset.parameters)
  }))
}))

const options = reactive({
  responsive: true,
  showLine: true,
  elements: {
    point: {
      radius: 0,
      hitRadius: 4,
      hoverRadius: 8
    }
  },
  plugins: {
    legend: {
      position: 'bottom'
    },
    title: {
      display: true,
      text: 'Cyclic Voltammogram'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Applied Potential (V)'
      },
      ticks: {
        callback: (value) => value.toFixed(3)
      }
    },
    y: {
      title: {
        display: true,
        text: 'Current (A)'
      },
      ticks: {
        callback: (value) => value.toExponential(2)
      }
    }
  }
})
</script>

<template>
  <div class="w-full">
    <Scatter :data="data" :options="options" />
  </div>
</template>
