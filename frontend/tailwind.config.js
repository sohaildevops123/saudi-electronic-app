/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saudi: {
          dark: '#0B0F19',
          card: '#131B2E',
          border: '#1E293B',
          emerald: '#059669',
          gold: '#D97706',
          goldHover: '#B45309',
          accent: '#10B981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
