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
      backgroundColor: {

        'custom-purple' : '#9A0963',
        'custom-purple-hover': '#6E0046',
      },
      textColor: {
        'custom-purple' : '#9A0963',
        'custom-purple-hover': '#6E0046',
      },
      borderColor: {
        'custom-purple' : '#9A0963',
        'custom-purple-hover': '#6E0046',
      },
      ringColor: {
        'custom-purple' : '#9A0963',
        'custom-purple-hover': '#6E0046',
      }, 
      textColor: {
        'custom-blue': '#54C1E9',
      },
      stroke: {
        'custom-blue': '#54C1E9',
      },

    },
  },
  plugins: [],
};
