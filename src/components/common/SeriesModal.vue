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
          <label class="w-12">Name</label>
          <input v-model="name" />
        </div>
        <div class="flex gap-2">
          <label class="w-12">Color</label>
          <input type="color" v-model="color" />
        </div>
        <button @click="addSeries()" :disabled="disableAdding" class="self-center mt-2">
          Save
        </button>
      </div>
    </div>
  </Transition>
</template>
