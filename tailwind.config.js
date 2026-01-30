/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['"Dancing Script"', "cursive"],
      },
      colors: {
        "wax-purple": "#86198f",
        "paper-cream": "#fdf2f8",
      },
    },
  },
  plugins: [],
};
