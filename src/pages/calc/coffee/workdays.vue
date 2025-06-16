<script setup lang="ts">
import { watch } from "vue";

// Stores
import UseStepsStore from "../../../stores/Steps";
const StepsStore = UseStepsStore();
import UseCalcCoffeeStore from "../../../stores/calc/Coffee";
const CalcCoffeeStore = UseCalcCoffeeStore();

// Actions
const Increment = () => {
  if (
    isNaN(CalcCoffeeStore.Workdays) ||
    CalcCoffeeStore.Workdays === null ||
    CalcCoffeeStore.Workdays === undefined
  )
    CalcCoffeeStore.Workdays = 22;
  else CalcCoffeeStore.Workdays++;
};

const Decrement = () => {
  if (
    isNaN(CalcCoffeeStore.Workdays) ||
    CalcCoffeeStore.Workdays === null ||
    CalcCoffeeStore.Workdays === undefined
  )
    CalcCoffeeStore.Workdays = 22;
  else if (CalcCoffeeStore.Workdays > 1) CalcCoffeeStore.Workdays--;
};

// Heroicons
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/outline";

// Validations
import { configure, useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  workdays: Yup.number()
    .nullable()
    .transform((Value, OriginalValue) => {
      if (OriginalValue === "" || /^\s*$/.test(OriginalValue)) {
        return null;
      }

      return Value;
    })
    .typeError("Bitte geben Sie eine gültige Zahl ein.")
    .required("Bitte geben Sie die Anzahl der Arbeitstage an.")
    .min(1, "Es muss mindestens ein Arbeitstag angegeben werden.")
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
  (Meta) => {
    console.log(Meta.valid);
    StepsStore.Valid = Meta.valid;
  }
);
</script>

<template>
  <form class="space-y-2">
    <div class="flex items-center w-full gap-4 overflow-hidden">
      <button
        class="flex items-center justify-center flex-shrink-0 transition-all bg-white disabled:opacity-50 size-14 rounded-xl"
        @click="Decrement"
        :disabled="CalcCoffeeStore.Workdays <= 1"
        type="button"
      >
        <MinusIcon class="text-cafe-primary size-6" />
      </button>

      <Field
        v-model="CalcCoffeeStore.Workdays"
        name="workdays"
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

    <ErrorMessage name="workdays" v-slot="{ message }">
      <div
        class="flex items-center justify-center w-full text-sm font-semibold text-center text-white"
      >
        {{ message }}
      </div>
    </ErrorMessage>
  </form>
</template>
