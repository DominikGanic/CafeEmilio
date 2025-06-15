import { defineConfig } from "vite";

// Plugins
import Vue from "@vitejs/plugin-vue";
import TailwindCSS from "@tailwindcss/vite";
import Pages from "vite-plugin-pages";

// https://vite.dev/config/
export default defineConfig({
  plugins: [Vue(), TailwindCSS(), Pages()],
});
