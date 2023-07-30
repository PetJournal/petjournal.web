/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-fredoka)'],
      },
      colors: {
        primary: {
          300: '#E06197',
          400: '#9A0963',
        },
        gray: {
          100: '#F2F2F2',
          300: '#B2B2B2',
        },
        link: {
          300: '#77DAF4',
          400: '#54C1E9',
        },
      },
    },
  },
  plugins: [],
};
