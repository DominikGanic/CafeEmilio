<script setup lang="ts">
// PrimeVue
import InputText from "primevue/inputtext";

// Stores
import UseCalcCoffeeStore from "../../../stores/calc/Coffee";
const CalcCoffeeStore = UseCalcCoffeeStore();
</script>

<template>
  <div class="flex items-center w-full gap-4 overflow-hidden">
    <InputText
      v-model="CalcCoffeeStore.Price"
      class="w-full !text-xl font-semibold text-center bg-white border-none outline-none rounded-xl text-cafe-primary h-14"
    />
  </div>
</template>
