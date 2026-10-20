/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#080808',
          card: '#121214',
          'card-hover': '#18181c',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-red': 'rgba(255, 0, 51, 0.4)',
          red: '#ff0033',
          'red-bright': '#ff2247',
          'red-dark': '#8a001a',
          'red-glow': 'rgba(255, 0, 51, 0.35)',
          muted: '#8e8e99',
          light: '#f4f4f6'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(255, 0, 51, 0.35)',
        'glow-red-lg': '0 0 35px rgba(255, 0, 51, 0.55)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    },
  },
  plugins: [],
};
