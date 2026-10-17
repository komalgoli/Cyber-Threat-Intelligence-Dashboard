/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nightfall: {
          bg: '#080809',
          panel: '#121315',
          panel2: '#15161a',
          card: '#17191d',
          cardWorn: '#1a1c21',
          border: '#272a2f',
          borderLight: '#33373e',
          borderWorn: '#1e2025',
          text: '#e2e2e4',
          textMuted: '#888a90',
          textDim: '#5d5f65',
          textFaded: '#3f4147',
          red: '#b4343a',
          redSoft: '#8a2a2f',
          redWorn: '#7a2327',
          redFaded: 'rgba(180,52,58,0.14)',
          amber: '#c98a2a',
          amberSoft: '#a06d1e',
          amberWorn: '#825717',
          amberFaded: 'rgba(201,138,42,0.14)',
          green: '#3c8a54',
          greenSoft: '#2d6a40',
          greenWorn: '#245433',
          greenFaded: 'rgba(60,138,84,0.14)',
          blue: '#2b6cb0',
          blueSoft: '#205080',
          blueWorn: '#194066',
          blueFaded: 'rgba(43,108,176,0.14)',
          ink: '#1a1a1a',
          paper: '#e9e5dc',
          paperWorn: '#ded9cd',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['"Source Serif Pro"', 'Georgia', 'serif'],
        stamp: ['"Courier New"', 'Consolas', 'monospace'],
        hand: ['"Caveat"', '"Segoe Script"', '"Comic Sans MS"', 'cursive'],
        type: ['"Special Elite"', '"Courier New"', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.03em',
      },
      animation: {
        'scanline': 'scanline 6s linear infinite',
        'pulse-slow': 'pulse 3.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slower': 'pulse 4.7s cubic-bezier(0.36, 0, 0.64, 1) infinite',
        'blink': 'blink 1.05s step-end infinite',
        'blink-lazy': 'blink 1.8s step-end infinite',
        'scroll-feed': 'scroll-feed 40s linear infinite',
        'jitter': 'jitter 0.4s steps(2) infinite',
        'flicker': 'flicker 3.8s infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scroll-feed': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        jitter: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%':      { transform: 'translate(0.4px, -0.3px)' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.85' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.35' numOctaves='3' stitchTiles='stitch' seed='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.91  0 0 0 0 0.89  0 0 0 0 0.82  0 0 0 0.1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'paper': '0 1px 1px rgba(0,0,0,0.15), 0 6px 14px -4px rgba(0,0,0,0.35)',
        'inset-worn': 'inset 0 0 30px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
}
