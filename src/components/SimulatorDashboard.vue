<script setup>
import CyclicVoltammogram from '@/components/main/CyclicVoltammogram.vue'
import InputParameters from '@/components/main/InputParameters.vue'
</script>

<template>
  <div class="flex max-xl:flex-col-reverse gap-4 h-full justify-center pb-4">
    <InputParameters class="max-w-3xl max-xl:self-center w-full overflow-auto h-full" />
    <CyclicVoltammogram
      class="w-full max-xl:self-center min-h-80 sm:min-h-112 max-h-128 md:max-xl:max-w-2xl xl:max-w-3xl"
    />
  </div>
</template>
