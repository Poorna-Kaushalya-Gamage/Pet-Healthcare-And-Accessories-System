/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      customBlue: '#073068',
    },
    fontFamily:{
      head: ['Kanit'],
    },
  },
  },
  plugins: [],
}

