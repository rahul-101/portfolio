import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg:       'var(--bg)',
          'bg-soft':'var(--bg-soft)',
          surface:  'var(--surface)',
          surface2: 'var(--surface2)',
          amber:    'var(--accent)',
          rose:     'var(--accent-2)',
          emerald:  'var(--accent-3)',
          text:     'var(--text)',
          muted:    'var(--text-dim)',
          border:   'var(--border)',
          'border-strong': 'var(--border-strong)',
        },
      },
      fontFamily: {
        display: ['Geist', 'system-ui', 'sans-serif'],
        body:    ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['Geist Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      borderRadius: {
        card: '18px',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          from: { backgroundPosition: '0% 50%' },
          to:   { backgroundPosition: '100% 50%' },
        },
        drift: {
          '0%':   { transform: 'translate(0,0) scale(1)' },
          '33%':  { transform: 'translate(40px,-30px) scale(1.05)' },
          '66%':  { transform: 'translate(-25px,20px) scale(0.97)' },
          '100%': { transform: 'translate(15px,-10px) scale(1.02)' },
        },
      },
      animation: {
        marquee:         'marquee 32s linear infinite',
        'gradient-shift':'gradientShift 6s ease-in-out infinite alternate',
        drift:           'drift 20s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;