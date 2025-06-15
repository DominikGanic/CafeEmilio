<script setup lang="ts">
import { ref } from "vue";

// PrimeVue
import InputText from "primevue/inputtext";

// Properties
const Value = ref<number>(0);

// Actions
const Increment = () => {
  Value.value++;
};
const Decrement = () => {
  if (Value.value > 0) Value.value--;
};
</script>

<template>
  <div
    class="flex-grow w-screen bg-cafe-primary text-white text-center p-8 flex items-center justify-center flex-col gap-6"
  >
    <div class="text-7xl">🧑‍🤝‍🧑</div>

    <div class="space-y-2">
      <h1 class="text-2xl font-bold">
        Wie viele Mitarbeitende arbeiten bei Ihnen?
      </h1>
      <p class="text-sm">
        Geben Sie die Gesamtanzahl Ihrer Mitarbeitenden an – unabhängig davon,
        ob sie regelmäßig Kaffee trinken oder nicht.
      </p>
    </div>

    <div class="flex items-center gap-4 overflow-hidden w-full">
      <button
        class="flex-shrink-0 bg-white disabled:opacity-50 size-14 rounded-xl flex items-center justify-center transition-all"
        @click="Decrement"
        :disabled="Value <= 0"
      >
        ➖
      </button>

      <InputText
        v-model="Value"
        class="w-full rounded-xl bg-white outline-none border-none text-center text-cafe-primary font-semibold text-2xl h-14"
      />

      <button
        class="flex-shrink-0 bg-white size-14 rounded-xl flex items-center justify-center"
        @click="Increment"
      >
        ➕
      </button>
    </div>
  </div>
</template>
