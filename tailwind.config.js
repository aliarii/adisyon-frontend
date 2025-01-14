/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-1": "#767676",
        "dark-2": "#6c6c6c",
        "dark-3": "#626262",
        "dark-4": "#585858",
        "dark-5": "#4e4e4e",
        "dark-6": "#444444",
        "dark-7": "#3a3a3a",
        "dark-8": "#303030",
        "dark-9": "#262626",
        "dark-10": "#1c1c1c",

        "light-1": "#f5f5f5",
        "light-2": "#ebebeb",
        "light-3": "#e1e1e1",
        "light-4": "#d7d7d7",
        "light-5": "#cdcdcd",
        "light-6": "#c3c3c3",
        "light-7": "#b9b9b9",
        "light-8": "#afafaf",
        "light-9": "#a5a5a5",
        "light-10": "#9b9b9b",

        "success": "#28a745",
        "danger": "#dc3545",
        "warning": "#ffc107",
        "info": "#17a2b8",

      },

    },
  },
  plugins: [],
  darkMode: 'selector',
}