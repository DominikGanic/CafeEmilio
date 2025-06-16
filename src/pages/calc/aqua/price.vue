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
  price: Yup.number()
    .nullable()
    .transform((Value, OriginalValue) => {
      if (OriginalValue === "" || /^\s*$/.test(OriginalValue)) return null;

      if (typeof OriginalValue === "string") {
        const CleanedValue = OriginalValue.trim();

        if (!/^\d+([.,]\d{1,2})?$/.test(CleanedValue)) return NaN;

        const NormalizedValue = CleanedValue.replace(",", ".");
        const ParsedValue = parseFloat(NormalizedValue);

        return isNaN(ParsedValue) ? NaN : ParsedValue;
      }

      return Value;
    })
    .typeError("Nur Preise sind erlaubt (z.B. 6,90 oder 7.99) - ohne Währungssymbol.")
    .required("Bitte geben Sie den Preis pro Kiste an.")
    .min(0.01, "Der Preis muss mindestens 0,01 € betragen.")
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
        v-model="CalcAquaStore.Price"
        name="price"
        class="w-full !text-xl font-semibold text-center bg-white border-none outline-none rounded-xl text-cafe-primary h-14"
      />
    </div>

    <ErrorMessage name="price" v-slot="{ message }">
      <div
        class="flex items-center justify-center w-full text-sm font-semibold text-center text-white"
      >
        {{ message }}
      </div>
    </ErrorMessage>
  </form>
</template>
