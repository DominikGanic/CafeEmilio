<script setup lang="ts">
import { watch } from "vue";

// Stores
import UseStepsStore from "../../../stores/Steps";
const StepsStore = UseStepsStore();
import UseCalcAquaStore from "../../../stores/calc/Aqua";
const CalcAquaStore = UseCalcAquaStore();

// Actions
const Increment = () => {
  if (
    isNaN(CalcAquaStore.Count) ||
    CalcAquaStore.Count === null ||
    CalcAquaStore.Count === undefined
  )
    CalcAquaStore.Count = 12;
  else CalcAquaStore.Count++;
};

const Decrement = () => {
  if (
    isNaN(CalcAquaStore.Count) ||
    CalcAquaStore.Count === null ||
    CalcAquaStore.Count === undefined
  )
    CalcAquaStore.Count = 12;
  else if (CalcAquaStore.Count > 1) CalcAquaStore.Count--;
};

// Heroicons
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";

// Validations
import { configure, useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  count: Yup.number()
    .nullable()
    .transform((Value, OriginalValue) => {
      if (OriginalValue === "" || /^\s*$/.test(OriginalValue)) {
        return null;
      }

      return Value;
    })
    .typeError("Bitte geben Sie eine gültige Zahl ein.")
    .required("Bitte geben Sie die Anzahl der Flaschen pro Kiste an.")
    .min(1, "Es muss mindestens eine Flasche pro Kiste angegeben werden.")
    .integer("Bitte geben Sie eine gültige Zahl ein."),
});

configure({
  validateOnChange: true,
  validateOnInput: true,
});

const Form = useForm({
  validationSchema: ValidationSchema,
});

// Watchers
watch(
  () => Form.meta.value,
  (Meta) => StepsStore.Valid = Meta.valid
);
</script>

<template>
  <form class="space-y-2">
    <div class="flex items-center w-full gap-4 overflow-hidden">
      <button
        class="flex items-center justify-center flex-shrink-0 transition-all bg-white disabled:opacity-50 size-14 rounded-xl"
        @click="Decrement"
        :disabled="CalcAquaStore.Count <= 1"
        type="button"
      >
        <MinusIcon class="text-cafe-primary size-6" />
      </button>

      <Field
        v-model="CalcAquaStore.Count"
        name="count"
        class="w-full !text-xl font-semibold text-center bg-white border-none outline-none rounded-xl text-cafe-primary h-14"
      />

      <button
        class="flex items-center justify-center flex-shrink-0 bg-white size-14 rounded-xl"
        @click="Increment"
        type="button"
      >
        <PlusIcon class="text-cafe-primary size-6" />
      </button>
    </div>

    <ErrorMessage name="count" v-slot="{ message }">
      <div
        class="flex items-center justify-center w-full text-sm font-semibold text-center text-white"
      >
        {{ message }}
      </div>
    </ErrorMessage>
  </form>
</template>
