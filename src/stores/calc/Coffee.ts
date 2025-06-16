import { defineStore } from "pinia";

export default defineStore("calc-coffee", {
  state: () => ({
    Employees: 10,
    Workdays: 22,
    Consumption: 3,
    Price: 0.79
  }),

  getters: {
    CupsPerYear(): number {
      return this.Employees * this.Workdays * this.Consumption * 12;
    },
    YearlyCosts(): number {
      return this.CupsPerYear * this.Price;
    },
    EmilioCosts(): number {
      return 99 * 12;
    },
    ToppingsCosts(): number {
      return this.CupsPerYear * 0.2864;
    },
    EmilioSummaryCosts(): number {
      return this.EmilioCosts + this.ToppingsCosts;
    },
    Savings(): number {
      return this.YearlyCosts - this.EmilioSummaryCosts;
    }
  },
});
