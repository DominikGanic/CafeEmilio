import { defineStore } from "pinia";

// Route
import { useRoute } from "vue-router";

export default defineStore("layout", {
  getters: {
    IsCoffee: () => {
      const Route = useRoute();

      if (!Route) return;

      return (
        typeof Route.name === "string" && Route.name.startsWith("calc-coffee")
      );
    },
    IsAqua: () => {
      const Route = useRoute();

      if (!Route) return;

      return (
        typeof Route.name === "string" && Route.name.startsWith("calc-aqua")
      );
    },
  },
});
