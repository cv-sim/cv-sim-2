<script setup>
import CyclicVoltammogram from '@/components/main/CyclicVoltammogram.vue'
import InputParameters from '@/components/main/InputParameters.vue'
</script>

<template>
  <div class="p-4">
    <h1 class="text-center mb-4 font-bold">Cyclic Voltammetry Simulator</h1>
    <div class="flex max-xl:flex-col-reverse gap-4">
      <InputParameters class="max-w-xl max-xl:self-center w-full" />
      <CyclicVoltammogram
        class="w-full max-xl:self-center min-h-80 md:min-h-112 md:max-xl:max-w-2xl xl:max-w-3xl"
      />
    </div>
  </div>
</template>
