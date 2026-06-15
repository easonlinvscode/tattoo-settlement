/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        brand: ['"Cinzel Decorative"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#050505',
          900: '#0A0A0A',
          800: '#141414',
          700: '#1C1C1C',
          600: '#252525',
          500: '#333333',
          400: '#4D4D4D',
          300: '#6B6B6B',
          200: '#969696',
          100: '#C2C2C2',
          50: '#E8E8E8',
        },
        parchment: {
          50: '#FDFAF4',
          100: '#F8F2E6',
          200: '#EDE4D4',
          300: '#DDD0BB',
        },
        wine: {
          700: '#5A1A1A',
          600: '#7A2222',
          500: '#9B3030',
          400: '#B84545',
          300: '#CE6B6B',
        },
        moss: {
          700: '#1A2E20',
          600: '#243D2C',
          500: '#2E4D38',
          400: '#3D6049',
          300: '#527A5F',
        },
        ember: {
          600: '#7A3D1A',
          500: '#9B5022',
          400: '#B86A33',
          300: '#CE8A55',
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
