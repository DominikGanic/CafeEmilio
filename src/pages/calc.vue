<script setup lang="ts">
import { onMounted } from "vue";

// Stores
import UseLayoutStore from "./../stores/Layout";
const LayoutStore = UseLayoutStore();
import UseStepsStore from "./../stores/Steps";
const StepsStore = UseStepsStore();

// Hooks
onMounted(() => StepsStore.Validate());

// Heroicons
import {
  ArrowLeftIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
</script>

<template>
  <div
    class="flex flex-col justify-between w-screen text-white h-dvh items-between"
    :class="[LayoutStore.IsCoffee ? 'bg-cafe-primary' : 'bg-aqua-primary']"
  >
    <div
      class="flex items-center flex-shrink-0 w-full h-20 px-8 text-white"
      :class="[
        LayoutStore.IsCoffee ? 'bg-cafe-primary-600' : 'bg-aqua-primary-600',
      ]"
    >
      <div class="flex items-center justify-between w-full max-w-3xl mx-auto">
        <RouterLink
          :to="{
            name: 'index',
          }"
          class="flex items-center justify-center bg-white size-12 text-cafe-primary-600 rounded-xl"
        >
          <ArrowLeftIcon class="size-5" />
        </RouterLink>

        <span class="text-xl font-bold">{{
          LayoutStore.IsCoffee ? "Kaffeerechner" : "Wasserrechner"
        }}</span>

        <a
          :href="
            LayoutStore.IsCoffee
              ? 'https://cafe-emilio.de'
              : 'https://youraqua.de'
          "
          target="_BLANK"
          class="flex items-center justify-center bg-white size-12 text-cafe-primary-600 rounded-xl"
        >
          <InformationCircleIcon class="size-5" />
        </a>
      </div>
    </div>

    <div
      class="w-full max-w-3xl gap-10 p-8 mx-auto space-y-6 overflow-y-auto text-center"
    >
      <Transition name="fade" mode="out-in">
        <div
          v-if="StepsStore.CurrentStep.icon"
          :key="StepsStore.Current"
          class="mx-auto text-7xl w-fit"
        >
          <component :is="StepsStore.CurrentStep.icon" class="size-16" />
        </div>
      </Transition>

      <Transition name="fade" mode="out-in">
        <div
          v-if="StepsStore.CurrentStep.title && StepsStore.CurrentStep.text"
          class="space-y-2"
        >
          <Transition name="fade" mode="out-in">
            <h1 :key="StepsStore.Current" class="text-2xl font-bold">
              {{ StepsStore.CurrentStep.title }}
            </h1>
          </Transition>

          <Transition name="fade" mode="out-in">
            <p :key="StepsStore.Current" class="text-sm">
              {{ StepsStore.CurrentStep.text }}
            </p>
          </Transition>
        </div>
      </Transition>

      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <div
      class="flex items-center flex-shrink-0 w-full h-20 px-8 text-white"
      :class="[
        LayoutStore.IsCoffee ? 'bg-cafe-primary-600' : 'bg-aqua-primary-600',
      ]"
    >
      <div
        class="flex items-center justify-between w-full max-w-3xl gap-4 mx-auto"
      >
        <Transition name="fade" mode="out-in">
          <button
            v-if="StepsStore.HasPrevious"
            @click="StepsStore.Previous"
            :disabled="!StepsStore.HasPrevious"
            type="button"
            class="flex items-center justify-center w-full px-4 text-black font-semibold bg-white rounded-xl !size-12 flex-shrink-0 disabled:opacity-50 transition-all"
          >
            <ArrowLeftIcon class="size-5" />
          </button>
        </Transition>

        <button
          v-if="StepsStore.HasNext"
          @click="StepsStore.Next"
          type="button"
          class="w-full h-12 px-4 font-semibold text-black bg-white rounded-xl"
        >
          Nächster Schritt
        </button>

        <button
          v-else
          @click="StepsStore.Contact"
          type="button"
          class="w-full h-12 px-4 font-semibold text-black bg-white rounded-xl"
        >
          Jetzt Kontakt aufnehmen
        </button>
      </div>
    </div>
  </div>
</template>
