/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#fdfbf7',
        tomato: {
          DEFAULT: '#ff473a',
          hover: '#e03a2e',
        },
        dark: {
          bg: '#121212',
          card: '#1e1e1e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      spacing: {
        '11': '2.75rem', // 44px touch targets
      }
    },
  },
  plugins: [],
}