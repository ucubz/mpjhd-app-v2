/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // <-- Tambahkan ini
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1e40af',
      },
    },
  },
  plugins: [],
}
