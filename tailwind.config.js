/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['DM Sans', 'sans-serif'],
        secondary: ['DM Mono', 'monospace'],
      },
      colors: {
        'off-black': '#181818',
      },
    },
  },
  plugins: [],
};
