import { defineStore } from 'pinia'
import mechanisms from '@/constants/mechanisms'
import conventions from '@/constants/conventions'

function getDefaultData() {
  return {
    title: 'Demo',
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
      temp: 293.15
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
      this.convention = conventions.US
      this.selectedID = 'default'
      this.datasets = { default: getDefaultData() }
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
    }
  }
})
