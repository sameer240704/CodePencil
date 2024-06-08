/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    daisyui: {
      themes: ["dark"],
    },
    extend: {
      colors: {
        background: {
          100: "#181818",
        },
        secondary: {
          100: "#662AFF",
          200: "#A37FFF",
          300: "#DBCEFD",
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
