/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#FEDC01",
        "dark-blue": {
          DEFAULT: "#002448",
          80: "#002448CC", // 80% opacity
          70: "#05345AB3", // 70% opacity
          50: "#00244880", // 50% opacity
         

        },
        blue: {
          DEFAULT: "#1F1A8C",
          70: "#1F1A8CB3", // 70% opacity
        },
        "light-blue": "#04ABFB",
      },
    },
  },
  plugins: [require("daisyui")],
};
