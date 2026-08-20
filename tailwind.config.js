/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        field: {
          50: '#eefdf3',
          100: '#d6f9e2',
          200: '#aef0c8',
          300: '#78e2a8',
          400: '#3fca82',
          500: '#1aab64',
          600: '#0f8a4f',
          700: '#0d6e42',
          800: '#0f5737',
          900: '#0d472f',
          950: '#052818',
        },
        dirt: {
          50: '#fbf6ee',
          100: '#f4e7d2',
          200: '#e7caa1',
          300: '#daac6f',
          400: '#cf914a',
          500: '#c17a34',
          600: '#a4602a',
          700: '#824a25',
          800: '#6b3d23',
          900: '#5a341f',
        },
        sun: {
          400: '#fbd34d',
          500: '#f5b81a',
          600: '#d99408',
        },
      },
    },
  },
  plugins: [],
}
