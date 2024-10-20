/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Afacad Flux", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        display: ["Nunito Sans", "sans-serif"],
      },
      colors: {
        primary: {
          blue: "#000842",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
};
