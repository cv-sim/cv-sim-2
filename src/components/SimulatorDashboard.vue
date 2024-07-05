<script setup>
import CyclicVoltammogram from '@/components/main/CyclicVoltammogram.vue'
import InputParameters from '@/components/main/InputParameters.vue'
</script>

<template>
  <div class="flex max-xl:flex-col-reverse gap-4 p-4">
    <InputParameters class="max-w-xl max-xl:self-center" />
    <CyclicVoltammogram
      class="w-full max-xl:self-center min-h-80 md:min-h-112 md:max-xl:max-w-2xl xl:max-w-3xl"
    />
  </div>
</template>
