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
  getters: {
    selectedDataset() {
      return this.datasets[this.selectedID] || null
    },
    selectedParameters() {
      return this.datasets[this.selectedID]?.parameters || {}
    }
  }
})
