module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{vue,ts,tsx}']
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [],
  corePlugins: {
    outline: false
  },
  important: '#app'
}
