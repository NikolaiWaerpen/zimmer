module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themecolor1: "#000201",
        themecolor2: "#0D2611",
        themecolor3: "#1D4A24",
        themecolor4: "#306E38",
        themecolor5: "#47924F",
        themecolor6: "#61B668",
        themecolor7: "#7EDA84",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
