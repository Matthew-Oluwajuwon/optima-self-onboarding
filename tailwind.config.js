/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "screen": "100svh"
      },
      colors: {
        "gray-500": "#667085"
      },
      fontFamily: {
        "euclid-semibold": "euclid-semibold"
      }
    },
  },
  plugins: [],
}