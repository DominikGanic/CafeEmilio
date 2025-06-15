<script setup lang="ts">
// Stores
import UseLayoutStore from "./../stores/Layout";
const LayoutStore = UseLayoutStore();

// Route
import { useRoute } from "vue-router";
const Route = useRoute();
</script>

<template>
  <div class="h-dvh w-screen flex items-between justify-between flex-col">
    <div
      class="flex-shrink-0 h-20 px-8 flex items-center justify-between text-white"
      :class="[
        LayoutStore.IsCoffe ? 'bg-cafe-primary-600' : 'bg-aqua-primary-600',
      ]"
    >
      <RouterLink
        :to="{
          name: 'index',
        }"
        class="size-10 bg-white text-cafe-primary-600 text-2xl rounded-xl flex items-center justify-center"
      >
        <
      </RouterLink>

      <span class="text-xl font-bold">{{
        LayoutStore.IsCoffe ? "Kaffeerechner" : "Wasserrechner"
      }}</span>

      <a
        :href="
          LayoutStore.IsCoffe ? 'https://cafe-emilio.de' : 'https://youraqua.de'
        "
        target="_BLANK"
        class="size-10 bg-white text-cafe-primary-600 text-sm rounded-xl flex items-center justify-center"
      >
        ℹ️
      </a>
    </div>

    <RouterView />

    <div
      class="flex-shrink-0 h-20 px-12 flex items-center justify-center bg-white"
    >
      FOOTER
    </div>
  </div>
</template>
