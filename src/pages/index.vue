<script setup lang="ts">
// Router
import Router from "../Router";

// Actions
const Navigate = async (To: string) =>
  Router.push({
    name: `calc-` + To,
  });
</script>

<template>
  <div
    class="flex flex-col items-stretch w-screen text-white justify-stretch h-dvh"
  >
    <button
      type="button"
      class="flex flex-col items-center justify-center flex-grow gap-4 p-12 transition-all cursor-pointer bg-cafe-primary hover:bg-cafe-primary-600 active:bg-cafe-primary-700 h-1/2"
      @click="Navigate('coffee')"
    >
      <h2 class="text-7xl">☕️</h2>

      <div class="space-y-2">
        <h1 class="text-3xl font-bold">Kaffeerechner</h1>
        <p class="text-sm">
          Ermitteln Sie Ihre jährlichen Kaffeekosten samt Einsparpotenzialen.
        </p>
      </div>
    </button>
    <button
      type="button"
      class="flex flex-col items-center justify-center flex-grow gap-6 p-12 transition-all cursor-pointer bg-aqua-primary hover:bg-aqua-primary-600 active:bg-aqua-primary-700 h-1/2"
      @click="Navigate('aqua')"
    >
      <h2 class="text-7xl">💧</h2>
      <div class="space-y-2">
        <h1 class="text-3xl font-bold">Wasserrechner</h1>
        <p class="text-sm">
          Berechnen Sie Ihre Wasserkosten und erfahren Sie, wie viel Sie sparen
          können.
        </p>
      </div>
    </button>
  </div>
</template>
