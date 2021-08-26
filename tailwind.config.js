module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "primary": "#D1515A",
        "secondary": '#091F43'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
