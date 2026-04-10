/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}", "./*.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        brand: {
          white: '#FFFFFF',
          yellow: '#F4C430',
          orange: '#DF6836',
          'orange-hover': '#c5572b',
          gray: '#666666',
          green: '#1B5E3F',
          salmon: '#F5E6D3',
          purple: "#7B2CBF",
          blue: "#003366"
        }
      }
    }
  },
  plugins: [],
}