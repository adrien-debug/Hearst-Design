/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
      },
      colors: {
        // Couleurs principales HEARST (modernisées)
        hearst: {
          green: '#10B981',  // Emerald 500 - Modern
          'green-dark': '#059669',  // Emerald 600
          'green-light': '#D1FAE5',  // Emerald 100
        },
        // Backgrounds modernes (clairs)
        dark: {
          900: '#0F172A',  // Slate 900 - Pour header/footer
          800: '#1E293B',  // Slate 800
          700: '#334155',  // Slate 700
          600: '#475569',  // Slate 600
          500: '#64748B',  // Slate 500
          400: '#94A3B8',  // Slate 400
        },
        // Grey scale moderne (clair)
        grey: {
          50: '#F9FAFB',   // Gray 50
          100: '#F3F4F6',  // Gray 100
          200: '#E5E7EB',  // Gray 200
          300: '#D1D5DB',  // Gray 300
          400: '#9CA3AF',  // Gray 400
          500: '#6B7280',  // Gray 500
          600: '#475569',  // Gray 600
          700: '#374151',  // Gray 700
        },
        // États (modernisés)
        success: '#10B981',  // Emerald 500
        warning: '#F59E0B',  // Amber 500
        error: '#EF4444',    // Red 500
        info: '#3B82F6',     // Blue 500
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif'
        ],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        text: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.25' }],
        'xl': ['1.25rem', { lineHeight: '1.25' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['2rem', { lineHeight: '1.25' }],
        '4xl': ['2.5rem', { lineHeight: '1.25' }],
      },
      spacing: {
        'sidebar': '200px',
        'header': '70px',
        'content': '2rem',      // 32px - Espacement pages
        'section': '3rem',      // 48px - Entre sections
        'card-lg': '2rem',      // 32px - Padding cards premium
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(16, 185, 129, 0.15)',
        'glow-strong': '0 4px 12px rgba(16, 185, 129, 0.25)',
        'card-rest': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'card-active': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },
      animation: {
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'fade-in': 'fadeIn 250ms ease-out forwards',
        'slide-in': 'slideIn 250ms ease-out forwards',
        'slide-in-right': 'slideInRight 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-green': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(10px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(138, 253, 129, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(138, 253, 129, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
