/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '16px'
    },
    extend: {
      fontFamily: {
        'public': ["Public Sans", 'sans-serif'],
        'spartan': ["League Spartan", 'sans-serif'],
      },
      colors:{
        'forest': '#0E1525',
        'secondary': '#e6e3e1',
        'soft-yellow': '#FAEB98',
      }      
    },
  },
  plugins: [],
}

