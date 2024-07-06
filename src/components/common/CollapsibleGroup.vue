<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: String
})

const emit = defineEmits(['update:modelValue'])

const visible = ref(props.modelValue)
const collapsible = ref(null)

const height = computed(() => {
  if (!collapsible.value) return 0
  return `${collapsible.value.scrollHeight}px`
})

watch(
  () => props.modelValue,
  (value) => (visible.value = value)
)
watch(visible, (value) => emit('update:modelValue', value))
</script>

<template>
  <div class="flex flex-col gap-2">
    <slot name="title">
      <button @click="visible = !visible" class="font-bold text-left py-2">
        <FontAwesomeIcon :icon="visible ? 'caret-up' : 'caret-down'" class="mr-2" />{{
          props.title
        }}
      </button>
    </slot>
    <div
      ref="collapsible"
      class="collapsible flex flex-col gap-2 px-2"
      :class="{ collapsed: !visible }"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped>
.collapsible {
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: v-bind(height);
}

.collapsed {
  max-height: 0 !important;
}
</style>
