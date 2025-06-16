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
    isNaN(CalcAquaStore.Consumption) ||
    CalcAquaStore.Consumption === null ||
    CalcAquaStore.Consumption === undefined
  )
    CalcAquaStore.Consumption = 2;
  else CalcAquaStore.Consumption++;
};

const Decrement = () => {
  if (
    isNaN(CalcAquaStore.Consumption) ||
    CalcAquaStore.Consumption === null ||
    CalcAquaStore.Consumption === undefined
  )
    CalcAquaStore.Consumption = 2;
  else if (CalcAquaStore.Consumption > 1) CalcAquaStore.Consumption--;
};

// Heroicons
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";

// Validations
import { configure, useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  consumption: Yup.number()
    .nullable()
    .transform((Value, OriginalValue) => {
      if (OriginalValue === "" || /^\s*$/.test(OriginalValue)) {
        return null;
      }

      return Value;
    })
    .typeError("Bitte geben Sie eine gültige Zahl ein.")
    .required("Bitte geben Sie die Anzahl der Flaschen an.")
    .min(1, "Es muss mindestens eine Flasche angegeben werden.")
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
        :disabled="CalcAquaStore.Consumption <= 1"
        type="button"
      >
        <MinusIcon class="text-cafe-primary size-6" />
      </button>

      <Field
        v-model="CalcAquaStore.Consumption"
        name="consumption"
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

    <ErrorMessage name="consumption" v-slot="{ message }">
      <div
        class="flex items-center justify-center w-full text-sm font-semibold text-center text-white"
      >
        {{ message }}
      </div>
    </ErrorMessage>
  </form>
</template>
