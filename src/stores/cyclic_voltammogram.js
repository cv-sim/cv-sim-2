import { defineStore } from 'pinia'
import calculateCyclicVoltammogram from '@/tools/calculate_voltammogram'

export const useCyclicVoltammogramStore = defineStore('cyclicVoltammogram', {
  state: () => {
    return {
      parameters: {
        scanRate: 40,
        vStd: 13,
        vStart: 200,
        vSwitch: -300,
        elCount: 1,
        cStart: 6 * Math.pow(10, -5),
        diffCoef: Math.pow(10, -5),
        kStd: 1,
        kFirstOrder: 0.075,
        transCoef: 0.5,
        area: 2.54 * Math.pow(10, -2),
        temp: 293.15
      }
    }
  },
  getters: {
    data: (state) => calculateCyclicVoltammogram(state.parameters)
  }
})
