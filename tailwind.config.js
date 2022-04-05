module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AW's color pallette
        "theme-1": "#000201",
        "theme-2": "#0D2611",
        "theme-3": "#1D4A24",
        "theme-4": "#306E38",
        "theme-5": "#47924F",
        "theme-6": "#61B668",
        "theme-7": "#7EDA84",
        // EXTRA
        "real-transparent": "00FFFFFF",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
