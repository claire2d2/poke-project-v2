/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      "press-start": ['"Press Start 2P"', "sans-serif"],
    },
    extend: {
      height: {
        nav: "50px",
      },
    },
  },
  plugins: [],
};
