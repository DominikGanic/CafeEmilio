import type { Component } from "vue";
import { defineStore } from "pinia";

// Stores
import UseLayoutStore from "./Layout";

// Router
import Router from "./../Router";

// Route
import { useRoute } from "vue-router";

// Heroicons
import {
  UserGroupIcon,
  ChartBarIcon,
  CurrencyEuroIcon,
  InformationCircleIcon,
  ArchiveBoxIcon,
  CalendarDaysIcon,
  SwatchIcon,
  UserCircleIcon
} from "@heroicons/vue/24/outline";

// Types
interface Step {
  path: string;
  icon?: Component;
  title?: string;
  text?: string;
}

// Store
export default defineStore("steps", {
  state: () => ({
    Current: 0,
    Steps: {
      coffee: [
        {
          path: "calc-coffee",
          icon: UserGroupIcon,
          title: "Anzahl Mitarbeitende",
          text: "Wie viele Personen arbeiten in Ihrem Unternehmen insgesamt?",
        },
        {
          path: "calc-coffee-workdays",
          icon: CalendarDaysIcon,
          title: "Arbeitstage pro Monat",
          text: "Wie viele Arbeitstage rechnen Sie pro Monat?",
        },
        {
          path: "calc-coffee-consumption",
          icon: ChartBarIcon,
          title: "Tassen pro Tag",
          text: "Wie viele Tassen Kaffee trinkt eine Person durchschnittlich pro Arbeitstag?",
        },
        {
          path: "calc-coffee-price",
          icon: CurrencyEuroIcon,
          title: "Kosten pro Tasse",
          text: "Was zahlen Sie aktuell für eine Tasse Kaffee? (Einkaufspreis oder geschätzt)",
        },
        {
          path: "calc-coffee-result",
          icon: InformationCircleIcon,
          title: "Ihre mögliche Einsparung",
          text: "Hier sehen Sie Ihre jährlichen Kaffeekosten – und wie viel Sie mit Café Emilio sparen können.",
        },
      ] as Step[],
      aqua: [
        {
          path: "calc-aqua",
          icon: UserGroupIcon,
          title: "Anzahl Mitarbeitende",
          text: "Wie viele Personen arbeiten in Ihrem Unternehmen insgesamt?",
        },
        {
          path: "calc-aqua-workdays",
          icon: CalendarDaysIcon,
          title: "Arbeitstage pro Monat",
          text: "Wie viele Arbeitstage rechnen Sie pro Monat?",
        },
        {
          path: "calc-aqua-count",
          icon: ArchiveBoxIcon,
          title: "Flaschen pro Kiste",
          text: "Wie viele Flaschen enthält eine Kiste Wasser in der Regel bei Ihnen? (z. B. 12)",
        },
        {
          path: "calc-aqua-volume",
          icon: SwatchIcon,
          title: "Volumen pro Flasche",
          text: "Wie viel Liter fasst eine Flasche? (z. B. 0,75 Liter)",
        },
        {
          path: "calc-aqua-price",
          icon: CurrencyEuroIcon,
          title: "Preis pro Kiste",
          text: "Was zahlen Sie aktuell für eine Kiste Wasser? (Einkaufspreis oder geschätzt)",
        },
        {
          path: "calc-aqua-consumption",
          icon: UserCircleIcon,
          title: "Verbrauch pro Tag",
          text: "Wie viele Flaschen davon trinkt eine Person durchschnittlich pro Arbeitstag?",
        },
        {
          path: "calc-aqua-result",
          icon: InformationCircleIcon,
          title: "Ihre mögliche Einsparung",
          text: "Hier sehen Sie Ihre jährlichen Wasserkosten – und wie viel Sie mit Emilio Aqua sparen können.",
        },
      ] as Step[],
    },
    Valid: false as boolean,
  }),

  getters: {
    HasPrevious(): boolean {
      return this.Current > 0;
    },

    HasNext(): boolean {
      const LayoutStore = UseLayoutStore();

      if (LayoutStore.IsCoffee)
        return this.Current < this.Steps.coffee.length - 1;
      else if (LayoutStore.IsAqua)
        return this.Current < this.Steps.aqua.length - 1;

      return false;
    },

    CurrentStep(): Step {
      const LayoutStore = UseLayoutStore();

      if (LayoutStore.IsCoffee) return this.Steps.coffee[this.Current];
      else return this.Steps.aqua[this.Current];
    },

    ActiveSteps(): Step[] {
      const LayoutStore = UseLayoutStore();

      if (LayoutStore.IsCoffee) return this.Steps.coffee;
      else if (LayoutStore.IsAqua) return this.Steps.aqua;

      return [];
    },
  },

  actions: {
    Next() {
      const LayoutStore = UseLayoutStore();

      let Steps: Step[] = [];

      if (LayoutStore.IsCoffee) Steps = this.Steps.coffee;
      else if (LayoutStore.IsAqua) Steps = this.Steps.aqua;

      if (this.Current >= Steps.length - 1) return;

      const NextStep = Steps[this.Current + 1];

      Router.push({ name: NextStep.path });

      this.Current++;
    },

    Previous() {
      if (!this.HasPrevious) return;

      const LayoutStore = UseLayoutStore();

      let Steps: Step[] = [];

      if (LayoutStore.IsCoffee) Steps = this.Steps.coffee;
      else if (LayoutStore.IsAqua) Steps = this.Steps.aqua;

      const PreviousStep = Steps[this.Current - 1];

      Router.push({ name: PreviousStep.path });

      this.Current--;
    },

    Validate() {
      const Route = useRoute();
      const LayoutStore = UseLayoutStore();
      const CurrentRouteName = Route.name as string;

      let Steps: Step[] = [];
      let FirstStep: Step | null = null;

      if (LayoutStore.IsCoffee) {
        Steps = this.Steps.coffee;
        FirstStep = this.Steps.coffee[0];
      } else if (LayoutStore.IsAqua) {
        Steps = this.Steps.aqua;
        FirstStep = this.Steps.aqua[0];
      }

      const CurrentRouteIndex = Steps.findIndex(
        (Step) => Step.path === CurrentRouteName
      );

      if (CurrentRouteIndex === -1 || !FirstStep) {
        if (FirstStep) {
          Router.push({ name: FirstStep.path });
          this.Current = 0;
        }

        return false;
      }

      if (CurrentRouteIndex > this.Current) {
        Router.push({ name: Steps[this.Current].path });
        return false;
      }

      this.Current = CurrentRouteIndex;

      return true;
    },

    Contact() {
      window.open("mailto:kontakt@cafe-emilio.com");
    },
  },
});
