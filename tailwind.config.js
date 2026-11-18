/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1e40af',
      },
    },
  },
  plugins: [],
}
