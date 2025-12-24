/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hearst Colors
        hearst: {
          green: '#8AFD81',
          'green-dark': '#5ae052',
          black: '#050506',
          'black-light': '#0a0b0d',
          grey: {
            50: 'rgba(255, 255, 255, 0.02)',
            100: 'rgba(255, 255, 255, 0.05)',
            200: 'rgba(255, 255, 255, 0.1)',
            300: 'rgba(255, 255, 255, 0.2)',
          },
        },
        status: {
          active: '#8AFD81',
          offline: '#EF4444',
          maintenance: '#F59E0B',
        },
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(circle at 1px 1px, rgba(138, 253, 129, 0.03) 1px, transparent 0)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-green': '0 0 60px rgba(138, 253, 129, 0.4)',
        'glow-green-sm': '0 0 30px rgba(138, 253, 129, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

