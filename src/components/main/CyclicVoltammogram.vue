<script setup>
import { Scatter } from 'vue-chartjs'
import { useGraphStore } from '@/stores/graph.js'
import { computed } from 'vue'
import conventions from '@/constants/conventions'

const store = useGraphStore()

const data = computed(() => ({
  datasets: Object.entries(store.datasets).map(([id, dataset]) => ({
    label: dataset.title,
    borderColor: dataset.color,
    backgroundColor: dataset.color,
    data: store.getCyclicVoltammogram(id).dataset,
    order: id === store.selectedID ? 0 : 1
  }))
}))

const options = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
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
      },
      reverse: store.convention === conventions.US
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
}))
</script>

<template>
  <div class="p-4 border-2 border-black rounded bg-slate-100">
    <Scatter :data="data" :options="options" />
  </div>
</template>
