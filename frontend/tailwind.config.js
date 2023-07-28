/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'gray1': '#282828',
      'gray2': '#1c1c1c',
      'yellow': '#fabd2f',
      'gruvboxBlue': '#83a598',
    },
    extend: {
      boxShadow:{
        'glow': '0 0 45px 45px rgb(0, 0, 0)',
      }
    },
  },
  plugins: [],
}

