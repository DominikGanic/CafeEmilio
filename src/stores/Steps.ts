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
  BriefcaseIcon,
  ChartBarIcon,
  CurrencyEuroIcon,
  InformationCircleIcon
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
          title: "Wie viele Mitarbeitende haben Sie?",
          text: "Bitte Gesamtzahl angeben – unabhängig vom Kaffeekonsum.",
        },
        {
          path: "calc-coffee-workdays",
          icon: BriefcaseIcon,
          title: "Wie viele Arbeitstage rechnen Sie pro Jahr?",
          text: "Bitte geben Sie die Anzahl der Arbeitstage an, die für die Berechnung relevant sind.",
        },
        {
          path: "calc-coffee-consumption",
          icon: ChartBarIcon,
          title: "Wie viele Tassen trinkt eine Person täglich?",
          text: "Bitte Durchschnitt angeben – auch ungefähre Werte sind völlig in Ordnung.",
        },
        {
          path: "calc-coffee-price",
          icon: CurrencyEuroIcon,
          title: "Was zahlen Sie aktuell pro Tasse Kaffee?",
          text: "Bitte Preis pro Tasse angeben – egal ob Einkaufspreis oder geschätzt.",
        },
        {
          path: "calc-coffee-result",
          icon: InformationCircleIcon,
          title: "Ihre Einsparung",
          text: "Hier sehen Sie Ihre jährliche Einsparung durch die Nutzung von Café Emilio.",
        },
      ] as Step[],
      aqua: [] as Step[],
    },
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
    }
  },
});
