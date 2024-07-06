import { defineStore } from 'pinia'
import DEFAULT_PARAMETERS from '../constants/parameters.js'

export const useGraphStore = defineStore('graphStore', {
  state: () => {
    return {
      selectedID: 'default',
      datasets: {
        default: {
          title: 'Demo',
          color: '#800000',
          parameters: { ...DEFAULT_PARAMETERS }
        }
      }
    }
  },
  actions: {
    addSeries(title, color) {
      if (!title || !color) return
      const id = Math.random().toString(36).substring(2, 7)
      this.datasets[id] = {
        title,
        color,
        parameters: { ...DEFAULT_PARAMETERS }
      }
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
      this.datasets = {
        default: {
          title: 'Demo',
          color: '#800000',
          parameters: { ...DEFAULT_PARAMETERS }
        }
      }
    }
  },
  getters: {
    selectedDataset() {
      return this.datasets[this.selectedID] || null
    },
    selectedParameters() {
      return this.datasets[this.selectedID]?.parameters || {}
    },
    count() {
      return Object.keys(this.datasets).length
    }
  }
})
