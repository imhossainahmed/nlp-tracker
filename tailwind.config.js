/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        body: ['DM Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f0ff',
          100: '#e0e0ff',
          400: '#7c6fff',
          500: '#6c63ff',
          600: '#5251cc',
          700: '#3d3a99',
        },
        emerald: { tracker: '#10b981' },
      },
      animation: {
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':  'fadeIn 0.3s ease forwards',
        'pop':      'pop 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        slideUp:  { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
        pop:      { from: { transform: 'scale(0.8)' }, to: { transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
}
