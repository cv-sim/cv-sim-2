<script setup>
import { useGraphStore } from '@/stores/graph'
import InputSlider from '@/components/common/InputSlider.vue'

const store = useGraphStore()
</script>

<template>
  <div class="flex flex-col gap-y-4 p-2">
    <div class="flex flex-col gap-y-2">
      <InputSlider
        label="Scan Rate (mV/s)"
        min="0"
        max="200"
        step="1"
        v-model="store.selectedParameters.scanRate"
      />
      <InputSlider
        label="Std. Reduction Potential (mV)"
        min="-750"
        max="750"
        step="0.01"
        v-model="store.selectedParameters.vStd"
      />
      <InputSlider
        label="Starting Potential (mV)"
        min="-1000"
        max="1000"
        step="0.01"
        v-model="store.selectedParameters.vStart"
      />
      <InputSlider
        label="Switching Potential (mV)"
        min="-1000"
        max="1000"
        step="0.01"
        v-model="store.selectedParameters.vSwitch"
      />
      <InputSlider
        label="Number of Electrons"
        min="1"
        max="3"
        step="1"
        v-model="store.selectedParameters.elCount"
      />
      <InputSlider
        label="Initial Concentration (M)"
        min="0"
        max="1e-3"
        step="1e-7"
        v-model="store.selectedParameters.cStart"
      />
      <InputSlider
        label="Diffusion Coefficient (cm<sup>2</sup>/s)"
        min="0"
        max="1e-3"
        step="1e-7"
        v-model="store.selectedParameters.diffCoef"
      />
      <InputSlider
        label="Std. Rate Constant (cm/s)"
        min="0"
        max="2"
        step="0.01"
        v-model="store.selectedParameters.kStd"
      />
      <InputSlider
        label="1<sup>st</sup> Order Rate Constant (s<sup>-1</sup>)"
        min="0"
        max="0.15"
        step="1e-5"
        v-model="store.selectedParameters.kFirstOrder"
      />
      <InputSlider
        label="Transfer Coefficient"
        min="0"
        max="1"
        step="0.01"
        v-model="store.selectedParameters.transCoef"
      />
      <InputSlider
        label="Electrode Area (cm<sup>2</sup>)"
        min="0"
        max="1"
        step="1e-4"
        v-model="store.selectedParameters.area"
      />
      <InputSlider
        label="Temperature (K)"
        min="0"
        max="500"
        step="0.01"
        v-model="store.selectedParameters.temp"
      />
    </div>
  </div>
</template>
