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
        'fredoka': ['Fredoka', 'sans-serif'],
      },
      colors: {
        'gray-border': 'rgba(122, 122, 122, 1)',
        'wine': 'rgba(154, 9, 99, 1)',
        'purple-pallet': '#F5F0FF'
      }
    },
  },
  plugins: [],
};
