<script setup>
import { Scatter } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useCyclicVoltammogramStore } from '@/stores/cyclic_voltammogram'
import { storeToRefs } from 'pinia'
import { reactive, computed } from 'vue'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
)

const store = storeToRefs(useCyclicVoltammogramStore())

const data = computed(() => ({
  datasets: [
    {
      label: 'Test',
      backgroundColor: '#FFFFFF',
      data: store.data.value
    }
  ]
}))

const options = reactive({
  responsive: true,
  showLine: true,
  elements: {
    point: {
      radius: 0
    }
  }
})
</script>

<template>
  <Scatter :data="data" :options="options" />
</template>
