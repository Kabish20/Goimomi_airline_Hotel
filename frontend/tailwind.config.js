/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oman: {
          navy: {
            DEFAULT: '#0a1d37',
            light: '#133054',
            dark: '#050f1d',
          },
          gold: {
            DEFAULT: '#c59b27',
            light: '#dfb743',
            dark: '#a27e1f',
          },
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
