<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: String
})

const visible = ref(false)
const collapsible = ref(null)

const height = computed(() => {
  if (!collapsible.value) return 0
  return `${collapsible.value.scrollHeight}px`
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <slot name="title">
      <button @click="visible = !visible" class="font-bold text-left py-2" v-text="props.title" />
    </slot>
    <div ref="collapsible" class="collapsible" :class="{ collapsed: !visible }">
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
