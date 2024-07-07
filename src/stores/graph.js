import { defineStore } from 'pinia'
import mechanisms from '@/constants/mechanisms'
import conventions from '@/constants/conventions'
import { calculateCyclicVoltammogram } from '@/tools/calculations'
import { exportCSV } from '@/tools/export'

function getDefaultData() {
  return {
    title: 'Series 1',
    color: '#800000',
    order: mechanisms.None,
    parameters: {
      scanRate: 40,
      vStd: 13,
      vStart: 200,
      vSwitch: -300,
      elCount: 1,
      cStart: 6.1 * 10 ** -5,
      diffCoef: 10 ** -5,
      kStd: 1,
      kFirstOrder: 0,
      kSecondOrder: 0,
      transCoef: 0.5,
      area: 2.54 * 10 ** -2,
      temp: 293.15,
      rotation: 0,
      viscosity: 1
    }
  }
}

export const useGraphStore = defineStore('graphStore', {
  state: () => {
    return {
      convention: conventions.US,
      selectedID: 'default',
      datasets: {
        default: getDefaultData()
      }
    }
  },
  actions: {
    addSeries(title, color) {
      if (!title || !color) return
      const id = Math.random().toString(36).substring(2, 7)
      this.datasets[id] = Object.assign(getDefaultData(), { color, title })
      this.selectedID = id
    },
    removeSeries(id) {
      if (this.count <= 1) return
      if (id === this.selectedID) {
        this.selectedID = Object.keys(this.datasets).find((datasetID) => datasetID !== id)
      }
      delete this.datasets[id]
    },
    reset() {
      this.selectedID = 'default'
      this.datasets = { default: getDefaultData() }
    },
    async export() {
      const sheets = this.sheets
      await exportCSV(sheets)
    }
  },
  getters: {
    selectedDataset() {
      return this.datasets[this.selectedID] || {}
    },
    selectedParameters() {
      return this.datasets[this.selectedID]?.parameters || {}
    },
    count() {
      return Object.keys(this.datasets).length
    },
    getCyclicVoltammogram() {
      return (id) => {
        const dataset = this.datasets[id]

        return calculateCyclicVoltammogram(dataset.parameters, {
          order: dataset.order,
          convention: this.convention
        })
      }
    },
    sheets() {
      return Object.entries(this.datasets).map(([id, dataset]) => {
        const raw = this.getCyclicVoltammogram(id)
        const data = raw.map((point) => Object.values(point).join(','))

        return { title: dataset.title, data: data.join('\n') }
      })
    }
  }
})
