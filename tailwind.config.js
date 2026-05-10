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
        // Legacy primary (kept for auth/dashboard pages)
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        // Futuristic dark theme
        dark: {
          bg:      '#0A0A0B',
          surface: '#111114',
          border:  '#1E1E24',
          muted:   '#0D0D10',
        },
        electric: {
          red:  '#FF0000',
          cyan: '#00D4FF',
        },
      },
      fontFamily: {
        mono: ["'SF Mono'", "'Fira Code'", "'Consolas'", "'Courier New'", 'monospace'],
        dogma: ["'Dogma'", 'sans-serif'],
      },
      boxShadow: {
        'glow-red':  '0 0 16px rgba(255,0,0,0.5), 0 0 48px rgba(255,0,0,0.15)',
        'glow-red-sm': '0 0 8px rgba(255,0,0,0.4)',
        'glow-cyan': '0 0 16px rgba(0,212,255,0.4), 0 0 48px rgba(0,212,255,0.1)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.6s ease forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scanline':   'scanline 4s linear infinite',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(255,0,0,0.4)' },
          '50%':      { boxShadow: '0 0 20px 4px rgba(255,0,0,0.7)' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
