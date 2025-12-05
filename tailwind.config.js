/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#0a0a0f',
          200: '#0f0f1a',
          300: '#151524',
          400: '#1a1a2e',
          500: '#22223a',
          600: '#2a2a45',
          700: '#323250',
          800: '#3a3a5a',
          900: '#424265',
        },
        neon: {
          green: '#00ff9d',
          blue: '#00d4ff',
          purple: '#9d4edd',
          yellow: '#ffd60a',
          pink: '#ff2e63',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          from: {
            boxShadow: '0 0 10px #00ff9d, 0 0 20px #00ff9d',
          },
          to: {
            boxShadow: '0 0 20px #00ff9d, 0 0 30px #00ff9d, 0 0 40px #00ff9d',
          }
        }
      },
      backdropBlur: {
        'lg': '16px',
      }
    },
  },
  plugins: [],
}
