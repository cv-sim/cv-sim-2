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
    data: store.getCyclicVoltammogram(id),
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
    },
    annotation: {
      animations: {
        numbers: {
          properties: [],
          type: 'number'
        }
      },
      annotations: {
        point1: {
          type: 'point',
          xValue: timesMap.value[store.time]?.x,
          yValue: timesMap.value[store.time]?.y,
          radius: 5
        }
      }
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

const timesMap = computed(() =>
  store.selectedCyclicVoltammogram.reduce(
    (acc, point) => ({ ...acc, [String(point.t)]: point }),
    {}
  )
)
const timeIncrements = computed(() => {
  const mod = (store.times.length - 1) / 10
  return store.times.reduce((acc, time, index) => {
    if (index % mod === 0) acc.push(time)

    return acc
  }, [])
})

const minTime = computed(() => store.times[0])
const maxTime = computed(() => store.times[store.times.length - 1])
const incTime = computed(() => store.times[1] - store.times[0])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="p-4 border-2 border-black rounded bg-slate-100 min-h-80 sm:min-h-96 max-h-128 h-full"
    >
      <Scatter :data="data" :options="options" />
    </div>
    <div class="flex gap-4">
      <label for="graph-time" class="text-nowrap my-auto">Time (s)</label>
      <input
        type="range"
        class="w-full py-2"
        :max="maxTime"
        :min="minTime"
        :step="incTime"
        v-model="store.time"
        list="time"
      />
      <datalist id="time">
        <option v-for="(time, index) in timeIncrements" :key="index" :value="time" />
      </datalist>
      <input
        id="graph-time"
        class="w-24"
        type="number"
        v-model="store.time"
        :min="minTime"
        :max="maxTime"
        :step="incTime"
      />
    </div>
  </div>
</template>
