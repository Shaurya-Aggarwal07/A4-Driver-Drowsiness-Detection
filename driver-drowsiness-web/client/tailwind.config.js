/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'alert-red': '#FF3B30',
        'safe-green': '#34C759',
        'primary': '#007AFF',
        'primary-dark': '#0062CC',
        'background': {
          light: '#F2F2F7',
          dark: '#1C1C1E'
        },
        'card': {
          light: '#FFFFFF',
          dark: '#2C2C2E'
        },
        'text': {
          light: '#1C1C1E',
          dark: '#FFFFFF'
        },
        'text-secondary': {
          light: '#6C6C70',
          dark: '#AEAEB2'
        },
        'border': {
          light: '#E5E5EA',
          dark: '#38383A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
} 