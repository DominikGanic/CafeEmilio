<script setup lang="ts">
// Stores
import UseCalcAquaStore from "../../../stores/calc/Aqua";
const CalcAquaStore = UseCalcAquaStore();

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
    <div class="text-black bg-white border-4 border-white rounded-xl">
      <div
        class="p-6 py-4 text-lg font-bold text-white bg-aqua-primary-700 rounded-xl"
      >
        Ihre aktuellen Kosten
      </div>

      <div class="p-6 py-4 space-y-4">
        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Flaschen pro Jahr</div>
            <div class="text-xs font-light">
              Das ist die Anzahl der Flaschen, die jährlich konsumiert werden
            </div>
          </div>
          <div class="text-lg font-bold shrink-0 text-aqua-primary">{{ CalcAquaStore.BottlesPerYear }}x</div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Preis pro Flasche</div>
            <div class="text-xs font-light">
              Das zahlen Ihre Mitarbeitenden für eine Flasche Wasser
            </div>
          </div>
          <div class="text-lg font-bold shrink-0 text-aqua-primary">{{ FormatCurrency(CalcAquaStore.PricePerBottle) }}</div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.YearlyCosts) }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-black bg-white border-4 border-white rounded-xl">
      <div
        class="p-6 py-4 text-lg font-bold text-white bg-aqua-primary-700 rounded-xl"
      >
        Unser Angebot für Sie
      </div>

      <div class="p-6 py-4 space-y-4">
        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Emilio Aqua</div>
            <div class="text-xs font-light">
              Laufzeit von <span class="font-semibold">60 Monaten</span> zu
              jeweils <span class="font-semibold">69,00 € / Monat</span>
            </div>
          </div>

          <div class="text-lg font-bold shrink-0 text-aqua-primary">{{ FormatCurrency(CalcAquaStore.EmilioCosts) }}</div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Zusatzkosten</div>
            <div class="text-xs font-light">
              Kohlensäure und Wasserfilter
            </div>
          </div>
          <div class="text-lg font-bold shrink-0 text-aqua-primary">{{ FormatCurrency(CalcAquaStore.AdditionalCosts) }}</div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.EmilioYearlyCosts) }}
          </div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Einsparungen</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.Savings) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
