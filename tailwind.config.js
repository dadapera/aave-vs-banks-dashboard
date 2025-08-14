/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aave-purple': '#8B5CF6',
        'aave-light': '#A78BFA',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
      },
    },
  },
  plugins: [],
}
