module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AW's color pallette
        themecolor1: "#000201",
        themecolor2: "#0D2611",
        themecolor3: "#1D4A24",
        themecolor3: "#306E38",
        themecolor4: "#47924F",
        themecolor4: "#61B668",
        themecolor5: "#7EDA84",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
