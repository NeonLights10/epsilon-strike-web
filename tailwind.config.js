const colors = require('tailwindcss/colors')

module.exports = {
  separator: '_',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        sky: colors.sky,
      },
      width: {
        '1of2': '50%',
        '8out12': '66.666667%',
        '3out12': '25%',
        '4out12': '33.333333%',
      },
      margin: {
        '0p5': '0.125rem',
        '2p5': '0.625rem',
      },
      backgroundImage: {
        'home-bg': "url('/images/bg.jpg')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
