<script setup lang="ts">
// PrimeVue
import InputText from "primevue/inputtext";

// Stores
import UseCalcCoffeeStore from "../../../stores/calc/Coffee";
const CalcCoffeeStore = UseCalcCoffeeStore();

// Actions
const FormatCurrency = (Value: number): string => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(Value);
};
</script>

<template>
  <div class="w-full space-y-6 divide-y divide-white">
    <div class="bg-white border-4 border-white rounded-xl text-cafe-primary">
      <div
        class="p-6 py-3 text-lg font-bold text-white bg-cafe-primary-700 rounded-xl"
      >
        Ihre aktuellen Kosten
      </div>

      <div class="p-6 py-3 space-y-3">
        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Tassen pro Jahr</div>
            <div class="text-xs font-light">
              Das ist die Anzahl der Tassen, die Ihre Mitarbeitenden pro Jahr trinken
            </div>
          </div>
          <div class="text-lg font-bold shrink-0">{{ CalcCoffeeStore.CupsPerYear }}x</div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Preis pro Tasse</div>
            <div class="text-xs font-light">
              Das zahlen Ihre Mitarbeitenden für eine Tasse Kaffee
            </div>
          </div>
          <div class="text-lg font-bold shrink-0">{{ FormatCurrency(CalcCoffeeStore.Price) }}</div>
        </div>

        <div class="w-full h-[1px] bg-cafe-primary"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten</div>
          <div class="text-xl font-bold shrink-0 text-cafe-secondary-800">
            {{ FormatCurrency(CalcCoffeeStore.YearlyCosts) }}
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white border-4 border-white rounded-xl text-cafe-primary">
      <div
        class="p-6 py-3 text-lg font-bold text-white bg-cafe-primary-700 rounded-xl"
      >
        Unser Angebot für Sie
      </div>

      <div class="p-6 py-3 space-y-3">
        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Café Emilio</div>
            <div class="text-xs font-light">
              Laufzeit von <span class="font-semibold">60 Monaten</span> zu
              jeweils <span class="font-semibold">99,00 € / Monat</span>
            </div>
          </div>

          <div class="text-lg font-bold shrink-0">1.188,00 €</div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Premium-Zutaten</div>
            <div class="text-xs font-light">
              Bohnen, Toppings und Schokolade
            </div>
          </div>
          <div class="text-lg font-bold shrink-0">{{ FormatCurrency(CalcCoffeeStore.ToppingsCosts) }}</div>
        </div>

        <div class="w-full h-[1px] bg-cafe-primary"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten</div>
          <div class="text-xl font-bold shrink-0 text-cafe-secondary-800">
            {{ FormatCurrency(CalcCoffeeStore.EmilioSummaryCosts) }}
          </div>
        </div>

        <div class="w-full h-[1px] bg-cafe-primary"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Einsparungen</div>
          <div class="text-xl font-bold shrink-0 text-cafe-secondary-800">
            {{ FormatCurrency(CalcCoffeeStore.Savings) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
