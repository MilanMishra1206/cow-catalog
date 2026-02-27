/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          800: '#2e7d32',
          900: '#1b5e20',
        }
      }
    },
  },
  plugins: [],
}
