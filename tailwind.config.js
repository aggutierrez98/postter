const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#261C2C",
        secondary: "#3E2C41",
        terciary: "#5C527F",
        // alternative: "#6E85B2",
        alternative: "#6285B2",
        // background: "#191919",
        // background: "#18001F",
        background: "#261C2C",
        placeholder: "#AAAAAA",
        text: "#D9D9D9",
        link: "#AE5EFF",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      screens: {
        "4xl": "1750px",
        "3xl": "1450px",
        phone: "500px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".scrollbar-custom::-webkit-scrollbar": {
          " -webkit-appearance": "none",
          "margin-right": "2px",
        },
        ".scrollbar-custom::-webkit-scrollbar:vertical": {
          width: "7px",
        },
        ".scrollbar-custom::-webkit-scrollbar:horizontal": {
          height: "10px",
        },
        ".scrollbar-custom::-webkit-scrollbar-button": {
          display: "none",
        },
        ".scrollbar-custom::-webkit-scrollbar-thumb": {
          "background-color": "rgba(120, 122, 145, 0.5)",
          "border-radius": "20px",
        },
        ".scrollbar-custom::-webkit-scrollbar-track": {
          "border-radius": "10px",
          cursor: "pointer",
        },
      });
    }),
  ],
};
