/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d1117',
        'dark-bg-secondary': '#161b22',

        'dark-text': '#c9d1d9',
        'dark-text-secondary': '#8b949e',

        'dark-accent': '#58a6ff',
        'dark-accent-hover': '#79b8ff',

        'dark-border': '#30363d',

        'dark-button': '#24292e',
        'dark-button-hover': '#2c3136',
        'dark-button-text': '#c9d1d9',

        'dark-alert': '#161b22',
        'dark-alert-text': '#8b949e',

        'dark-success': '#28a745',
        'dark-success-text': '#c9d1d9',

        'dark-error': '#cb2431',
        'dark-error-text': '#c9d1d9',
      },
    },
  },
  plugins: [],
}

