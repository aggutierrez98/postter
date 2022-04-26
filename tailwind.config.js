const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        sh: "rgba(0, 0, 0, 0.25) 0px 0px 20px",
        mh: "rgba(0, 0, 0, 0.25) 0px 0px 35px",
      },
      colors: {
        custom: {
          primary: "var(--primary)",
          secondary: "var(--secondary)",
          terciary: "var(--terciary)",
          alternative: "var(--alternative)",
          placeholder: "var(--placeholder)",
          text: "var(--text)",
          link: "var(--link)",
          hover: "var(--hover)",
          link_hover: "var(--link_hover)",
        },
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
    require("@tailwindcss/line-clamp"),
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
