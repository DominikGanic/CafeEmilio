<script setup lang="ts">
// PrimeVue
import InputText from "primevue/inputtext";

// Stores
import UseCalcCoffeeStore from "../../../stores/calc/Coffee";
const CalcCoffeeStore = UseCalcCoffeeStore();

// Actions
const Increment = () => {
  CalcCoffeeStore.Consumption++;
};
const Decrement = () => {
  if (CalcCoffeeStore.Consumption > 0) CalcCoffeeStore.Consumption--;
};

// Heroicons
import {
  PlusIcon, MinusIcon
} from "@heroicons/vue/24/outline";
</script>

<template>
  <div class="flex items-center w-full gap-4 overflow-hidden">
    <button
      class="flex items-center justify-center flex-shrink-0 transition-all bg-white disabled:opacity-50 size-14 rounded-xl"
      @click="Decrement"
      :disabled="CalcCoffeeStore.Consumption <= 0"
    >
      <MinusIcon class="text-cafe-primary size-6" />
    </button>

    <InputText
      v-model="CalcCoffeeStore.Consumption"
      class="w-full !text-xl font-semibold text-center bg-white border-none outline-none rounded-xl text-cafe-primary h-14"
    />

    <button
      class="flex items-center justify-center flex-shrink-0 bg-white size-14 rounded-xl"
      @click="Increment"
    >
      <PlusIcon class="text-cafe-primary size-6" />
    </button>
  </div>
</template>
