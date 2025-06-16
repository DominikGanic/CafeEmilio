<script setup lang="ts">
import { watch } from "vue";

// Stores
import UseStepsStore from "../../../stores/Steps";
const StepsStore = UseStepsStore();
import UseCalcAquaStore from "../../../stores/calc/Aqua";
const CalcAquaStore = UseCalcAquaStore();

// Validations
import { configure, useForm, Field, ErrorMessage } from "vee-validate";
import * as Yup from "yup";

const ValidationSchema = Yup.object({
  volume: Yup.number()
    .nullable()
    .transform((Value, OriginalValue) => {
      if (OriginalValue === "" || /^\s*$/.test(OriginalValue)) return null;

      if (typeof OriginalValue === "string") {
        const CleanedValue = OriginalValue.trim();

        if (!/^\d+([.,]\d{1,3})?$/.test(CleanedValue)) return NaN;

        const NormalizedValue = CleanedValue.replace(",", ".");
        const ParsedValue = parseFloat(NormalizedValue);

        return isNaN(ParsedValue) ? NaN : ParsedValue;
      }

      return Value;
    })
    .typeError("Bitte geben Sie ein gültiges Volumen ein (z.B. 0,75 oder 1.000)")
    .required("Bitte geben Sie das Volumen in Litern an.")
    .min(0.1, "Das Volumen muss mindestens 0,1 Liter betragen.")
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
      <Field
        v-model="CalcAquaStore.Volume"
        name="volume"
        class="w-full !text-xl font-semibold text-center bg-white border-none outline-none rounded-xl text-cafe-primary h-14"
      />
    </div>

    <ErrorMessage name="volume" v-slot="{ message }">
      <div
        class="flex items-center justify-center w-full text-sm font-semibold text-center text-white"
      >
        {{ message }}
      </div>
    </ErrorMessage>
  </form>
</template>
