/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'dark': {
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
        'neon': {
          'green': '#00ff9d',
          'blue': '#00d4ff',
          'purple': '#9d4edd',
          'yellow': '#ffd60a',
          'pink': '#ff2e63',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typewriter': 'typewriter 2s steps(11) 1s 1 normal both',
        'blink': 'blink 0.75s step-end infinite',
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
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '11ch' }
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00ff9d' }
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'neon-green': '0 0 20px rgba(0, 255, 157, 0.3)',
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(157, 78, 221, 0.3)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
