<script setup>
import { useGraphStore } from '@/stores/graph'
import mechanisms from '@/constants/mechanisms'
import species from '@/constants/species'
import InputSlider from '@/components/common/InputSlider.vue'
import InputSelect from '@/components/common/InputSelect.vue'
import SeriesModal from '@/components/common/SeriesModal.vue'
import CollapsibleGroup from '@/components/common/CollapsibleGroup.vue'
import { computed, ref, reactive } from 'vue'

const store = useGraphStore()

const seriesModalOpen = ref(false)
const groupVisibilities = reactive({
  halfReaction: false,
  triangleWaveform: false,
  experimentalConditions: false,
  ecMechanism: false,
  rotation: false
})

const seriesOptions = computed(() =>
  Object.entries(store.datasets).map(([key, value]) => ({
    text: value.title,
    value: key
  }))
)
const allGroupsExpanded = computed(() => Object.values(groupVisibilities).every(Boolean))
const allGroupsCollapsed = computed(() => Object.values(groupVisibilities).every((value) => !value))
const mechanismOptions = computed(() =>
  Object.entries(mechanisms).map(([key, value]) => ({
    text: key,
    value
  }))
)
const speciesOptions = computed(() =>
  Object.entries(species).map(([key, value]) => ({
    text: `${key[0].toUpperCase()}${key.substring(1).toLowerCase()}`,
    value
  }))
)

function toggleGroupVisibilities(value) {
  Object.keys(groupVisibilities).forEach((key) => (groupVisibilities[key] = value))
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <InputSelect label="<b>Series:</b>" v-model="store.selectedID" :options="seriesOptions">
        <template #after-select>
          <button @click="store.removeSeries(store.selectedID)" :disabled="store.count <= 1">
            <FontAwesomeIcon icon="trash" class="mr-1" />
            Remove
          </button>
          <div>
            <button @click="seriesModalOpen = !seriesModalOpen">
              <FontAwesomeIcon icon="plus" class="mr-1" />
              Add New
            </button>
            <SeriesModal @close="seriesModalOpen = false" :visible="seriesModalOpen" class="mt-1" />
          </div>
        </template>
      </InputSelect>
    </div>
    <hr />
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap gap-4 mb-2">
        <span class="font-bold">Input Parameters</span>
        <button
          @click="toggleGroupVisibilities(true)"
          :disabled="allGroupsExpanded"
          class="self-center"
        >
          <FontAwesomeIcon icon="expand" class="mr-1" />
          Expand All
        </button>
        <button
          @click="toggleGroupVisibilities(false)"
          :disabled="allGroupsCollapsed"
          class="self-center"
        >
          <FontAwesomeIcon icon="compress" class="mr-1" />
          Collapse All
        </button>
      </div>
      <CollapsibleGroup v-model="groupVisibilities.halfReaction" title="Half-Reaction">
        <InputSlider
          label="Std. Reduction Potential (mV)"
          min="-750"
          max="750"
          step="0.01"
          v-model="store.selectedParameters.vStd"
        />
        <InputSlider
          label="Std. Rate Constant (cm/s)"
          min="0"
          max="2"
          step="0.01"
          v-model="store.selectedParameters.kStd"
        />
        <InputSlider
          label="Number of Electrons"
          min="1"
          max="3"
          step="1"
          v-model="store.selectedParameters.elCount"
        />
        <InputSlider
          label="Transfer Coefficient"
          min="0"
          max="1"
          step="0.01"
          v-model="store.selectedParameters.transCoef"
        />
        <InputSlider
          label="Diffusion Coefficient (cm<sup>2</sup>/s)"
          min="0"
          max="1e-3"
          step="1e-7"
          v-model="store.selectedParameters.diffCoef"
        />
      </CollapsibleGroup>
      <CollapsibleGroup v-model="groupVisibilities.triangleWaveform" title="Triangle Waveform">
        <InputSlider
          label="Upper Potential (mV)"
          min="-1000"
          max="1000"
          step="0.01"
          v-model="store.selectedParameters.vUpper"
        />
        <InputSlider
          label="Lower Potential (mV)"
          min="-1000"
          max="1000"
          step="0.01"
          v-model="store.selectedParameters.vLower"
        />
        <InputSlider
          label="Scan Rate (mV/s)"
          min="0"
          max="200"
          step="1"
          v-model="store.selectedParameters.scanRate"
        />
      </CollapsibleGroup>
      <CollapsibleGroup
        v-model="groupVisibilities.experimentalConditions"
        title="Experimental Conditions"
      >
        <InputSelect
          label="Species in Solution"
          :options="speciesOptions"
          v-model="store.selectedDataset.species"
        />
        <InputSlider
          label="Initial Concentration (M)"
          min="0"
          max="1e-3"
          step="1e-7"
          v-model="store.selectedParameters.cStart"
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
      </CollapsibleGroup>
      <CollapsibleGroup v-model="groupVisibilities.ecMechanism" title="Mechanism">
        <InputSelect
          label="Mechanism"
          v-model="store.selectedDataset.order"
          :options="mechanismOptions"
        />
        <InputSlider
          v-if="Number(store.selectedDataset.order) === 1"
          label="1<sup>st</sup> Order Rate Constant (s<sup>-1</sup>)"
          min="0"
          max="0.15"
          step="1e-5"
          v-model="store.selectedParameters.kFirstOrder"
        />
        <InputSlider
          v-if="Number(store.selectedDataset.order) === 2"
          label="2<sup>nd</sup> Order Rate Constant (cm<sup>3</sup>/mol s)"
          min="0"
          max="1e7"
          step="1e2"
          v-model="store.selectedParameters.kSecondOrder"
        />
      </CollapsibleGroup>
      <CollapsibleGroup v-model="groupVisibilities.rotation" title="Rotation">
        <InputSlider
          label="Rotation Rate (rpm)"
          min="0"
          max="750"
          step="0.01"
          v-model="store.selectedParameters.rotation"
        />
        <InputSlider
          label="Kinematic Viscosity (cm<sup>2</sup>/s)"
          min="0"
          max="10"
          step="0.01"
          v-model="store.selectedParameters.viscosity"
        />
      </CollapsibleGroup>
    </div>
  </div>
</template>
