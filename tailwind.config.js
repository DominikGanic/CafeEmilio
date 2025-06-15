module.exports = {
  darkMode: "class",
  content: {
    files: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
      "./node_modules/@leetlabs-hq/leetlabs-ui-vue/**/*.{vue,js,ts,jsx,tsx}",
    ],
    transform: {
      vue: (content) => {
        // Dies verarbeitet die @-Syntax korrekt in Vue-Templates
        return content;
      },
    },
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
