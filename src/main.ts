import { createApp } from "vue";

// Styles
import "./assets/css/main.css";

// App Entry Point
import App from "./App.vue";

// Router
import Router from "./Router";

// Pinia
import { createPinia } from "pinia";
const Pinia = createPinia();

// Prime Vue
import PrimeVue from "primevue/config";

// Create and mount the Vue application
createApp(App)
  .use(Router)
  .use(PrimeVue, {
    theme: "none",
  })
  .use(Pinia)
  .mount("#app");
