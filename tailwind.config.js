/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito"', '"Georama"', "sans-serif"],
      },
      colors: {
        savoy: "#4363D2",
        jet: "#282A2D",
        columbia: "#CFDEE7",
        cornell: "#B91C1C",
        dark_spring: "#307351",
      },
    },
  },
  plugins: [],
};
