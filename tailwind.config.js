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
        'custom-purple': '#9A0963',
        'custom-blue': '#8093F1',
        'custom-cyan': '#AFD9DB',
        'custom-pink': '#FFB8EB',
      },
      textColor: {
        'custom-blue': '#54C1E9',
      },
    },
  },
  plugins: [],
};
