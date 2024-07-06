/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        112: '28rem',
        128: '32rem',
        'screen-95': '95vh'
      }
    }
  },
  plugins: []
}
