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
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
        },
        neon: {
          green: '#00ff41',
          purple: '#bc13fe',
          blue: '#00ffff',
          red: '#ff073a',
          yellow: '#ffff00'
        }
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          'from': { 'textShadow': '0 0 5px #00ff41, 0 0 10px #00ff41' },
          'to': { 'textShadow': '0 0 10px #00ff41, 0 0 20px #00ff41' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
