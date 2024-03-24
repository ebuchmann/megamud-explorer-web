/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,tsx}',
    './index.html',
    './node_modules/tw-elements/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tw-elements/plugin.cjs')],
};
