import { defineStore } from "pinia";

export default defineStore("calc-aqua", {
  state: () => ({
    Employees: 10,
    Workdays: 22,
    Count: 12,
    Volume: "1",
    Price: "6,90",
    Consumption: 2,
  }),

  getters: {
    ParsedPrice(): number {
      if (typeof this.Price === "string") {
        const NormalizedPrice = this.Price.replace(",", ".");
        const Parsed = parseFloat(NormalizedPrice);
        return isNaN(Parsed) ? 6.9 : Parsed;
      }

      return typeof this.Price === "number" ? this.Price : 6.9;
    },

    PricePerBottle(): number {
      return this.ParsedPrice / this.Count;
    },

    BottlesPerYear(): number {
      return this.Employees * this.Workdays * 12 * this.Consumption;
    },

    YearlyCosts(): number {
      const WorkdaysPerYear = this.Workdays * 12;
      const WorkdaysPerYearWithEmployees = WorkdaysPerYear * this.Employees;

      return WorkdaysPerYearWithEmployees * 0.77;
    },

    EmilioCosts(): number {
      return 69 * 12;
    },

    AdditionalCosts(): number {
      return 120;
    },

    EmilioYearlyCosts(): number {
      return this.EmilioCosts + this.AdditionalCosts;
    },

    Savings(): number {
      return this.YearlyCosts - this.EmilioYearlyCosts;
    },
  },

  actions: {},
});
