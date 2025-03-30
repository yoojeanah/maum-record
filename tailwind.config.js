/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/globals.css"                    // 전역 스타일도 추적
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};