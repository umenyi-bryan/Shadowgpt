/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#1a1a1a',
          200: '#0f0f0f',
          300: '#2a2a2a',
        },
        neon: {
          green: '#00ff41',
          purple: '#bc13fe',
          blue: '#00ffff',
          red: '#ff073a'
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'terminal-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        glow: {
          from: { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41, 0 0 15px #00ff41' },
          to: { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' }
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 }
        }
      }
    },
  },
  plugins: [],
}
