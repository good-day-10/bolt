/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 全站底色 — 米白 / 燕麥
        paper: {
          50: '#FBF9F0',
          100: '#F4F1DE',
          200: '#EDE8D0',
          300: '#E0D9BE',
        },
        // 主色調 — 柿黃 / 暖橘
        persimmon: {
          50: '#FDF0EB',
          100: '#F9D9CC',
          200: '#F2B39B',
          300: '#E89171',
          400: '#E07A5F',
          500: '#CC5F44',
          600: '#A84A33',
          700: '#823726',
        },
        // 輔助色 — 大地棕 / 泥土色
        earth: {
          50: '#F2EBE7',
          100: '#D9C9BE',
          200: '#B89884',
          300: '#8F6E5A',
          400: '#6B4D3E',
          500: '#553A2E',
          600: '#3F2A21',
          700: '#2A1B15',
        },
        // 生態點綴 — 溪流藍
        stream: {
          50: '#EEF4FA',
          100: '#D4E3F0',
          200: '#A8C4DE',
          300: '#81A4CD',
          400: '#5E85B0',
          500: '#486B92',
          600: '#365576',
        },
        // 生態點綴 — 苔綠 / 青蛙綠
        moss: {
          50: '#EEF3EF',
          100: '#D5E2D8',
          200: '#AAC4B0',
          300: '#86A88E',
          400: '#6A8D73',
          500: '#527358',
          600: '#3D5A42',
          700: '#2A402E',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif TC"', '"Songti TC"', '"SimSun"', 'serif'],
        sans: ['"Noto Sans TC"', '"PingFang TC"', '"Microsoft JhengHei"', 'sans-serif'],
        hand: ['"Noto Serif TC"', '"Kaiti TC"', '"STKaiti"', 'cursive'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.9s ease-out forwards',
        'ripple': 'ripple 1.2s ease-out forwards',
        'draw': 'draw 2.5s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
