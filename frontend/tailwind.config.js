// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", // Include all JS, TS, JSX, TSX files in src
    ],
    theme: {
      extend: {
        colors: {
          // Your SELENZA color palette
          'selenza-black': '#000000',
          'selenza-dark-gray': '#393939',
          'selenza-cool-gray': '#5e6461',
          'selenza-maroon': '#79251f',
          'selenza-medium-gray': '#8d8d8d',
          'selenza-bright-red': '#eb001b',
          'selenza-vibrant-red': '#f01109',
          'selenza-pure-red': '#ff0900',
          'selenza-white': '#fefefe',
          'selenza-dark-red': '#d20000',
        }
      },
    },
    plugins: [],
  }