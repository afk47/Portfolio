/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: "#00FF00",
        orange: "#FFA500",
        purple: "#800080",
        transparent: "transparent",
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
      },
      spacing: {
        '1/3': '33%',
      },
    },
  },
  plugins: [],
};
