<script setup>
import { useGraphStore } from '@/stores/graph'
import { ref, computed, watch, onMounted } from 'vue'

const props = defineProps({
  visible: Boolean
})

const emit = defineEmits(['close'])

const store = useGraphStore()

const name = ref('')
const color = ref('')

onMounted(() => reset)

function reset() {
  name.value = `Series ${store.count + 1}`
  color.value = '#000000'
}

function addSeries() {
  store.addSeries(name.value, color.value)
  emit('close')
  reset()
}

watch(() => props.visible, reset)

const disableAdding = computed(() => {
  return !name.value || !color.value
})
</script>

<template>
  <Transition>
    <div v-if="props.visible" class="border border-black bg-white rounded absolute">
      <div class="flex flex-col gap-2 p-4">
        <div class="flex gap-2">
          <label for="series-name" class="w-12">Name</label>
          <input id="series-name" v-model="name" />
        </div>
        <div class="flex gap-2">
          <label for="series-color" class="w-12">Color</label>
          <input id="series-color" type="color" v-model="color" />
        </div>
        <div class="flex justify-center gap-2">
          <button @click="emit('close')" class="self-center mt-2">
            <FontAwesomeIcon icon="ban" class="mr-1" />
            Cancel
          </button>
          <button @click="addSeries()" :disabled="disableAdding" class="self-center mt-2">
            <FontAwesomeIcon icon="check" class="mr-1" />
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
