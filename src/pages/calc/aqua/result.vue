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

// Heroicons
import {
  UserGroupIcon,
  CalendarDaysIcon,
} from "@heroicons/vue/24/outline";
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
          <div class="text-base font-bold">Anzahl Mitarbeiter</div>
          <div class="flex items-center justify-end gap-2 text-xl font-bold shrink-0 text-aqua-primary">
            <UserGroupIcon class="size-5" /> {{ CalcAquaStore.Employees }}
          </div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Arbeitstage im Monat</div>
          <div class="flex items-center justify-end gap-2 text-xl font-bold shrink-0 text-aqua-primary">
            <CalendarDaysIcon class="size-5" /> {{ CalcAquaStore.Workdays }}
          </div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten*</div>
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

          <div class="text-lg font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.EmilioCosts) }}
          </div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div>
            <div class="text-sm font-semibold">Zusatzkosten</div>
            <div class="text-xs font-light">Kohlensäure und Wasserfilter</div>
          </div>
          <div class="text-lg font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.AdditionalCosts) }}
          </div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Jährliche Kosten</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.EmilioYearlyCosts) }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-black bg-white border-4 border-white rounded-xl">
      <div
        class="p-6 py-4 text-lg font-bold text-white bg-aqua-primary-700 rounded-xl"
      >
        Mögliche Einsparungen
      </div>

      <div class="p-6 py-4 space-y-4">
        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Ihre Kosten</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            {{ FormatCurrency(CalcAquaStore.YearlyCosts) }}
          </div>
        </div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Emilio Aqua</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            - {{ FormatCurrency(CalcAquaStore.EmilioYearlyCosts) }}
          </div>
        </div>

        <div class="w-full h-[1px] bg-aqua-primary/50"></div>

        <div class="flex items-center justify-between w-full gap-3 text-left">
          <div class="text-base font-bold">Einsparungen</div>
          <div class="text-xl font-bold shrink-0 text-aqua-primary">
            = {{ FormatCurrency(CalcAquaStore.Savings) }}
          </div>
        </div>
      </div>
    </div>

    <div class="text-xs italic">
      <strong>*Jährliche Kosten:</strong> Die Berechnung basiert auf einer Beispielkalkulation: <strong>1 Kiste</strong> mit <strong>12 Flaschen à 0,75 l</strong> zum Preis von <strong>6,90 €</strong> (Literpreis ca. <strong>0,77 €</strong>), bei einem angenommenen durchschnittlichen Verbrauch von <strong>1 Liter pro Mitarbeiter und Tag</strong>. Preise, Verbrauch und tatsächliche Kosten können je nach Anbieter und Nutzung variieren. Alle Angaben ohne Gewähr.
    </div>
  </div>
</template>
