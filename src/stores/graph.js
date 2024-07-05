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
      const id = Math.random().toString(36).substring(2, 7)
      this.datasets[id] = {
        title,
        color,
        parameters: { ...DEFAULT_PARAMETERS }
      }
    },
    removeSeries(id) {
      delete this.datasets[id]
    }
  },
  getters: {
    selectedDataset() {
      return this.datasets[this.selectedID] || null
    },
    selectedParameters() {
      return this.datasets[this.selectedID]?.parameters || {}
    }
  }
})
