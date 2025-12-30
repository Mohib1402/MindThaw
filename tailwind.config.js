/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Winter Palette (The Starting State)
        winter: {
          dark: '#1e293b', // Slate 800
          medium: '#334155', // Slate 700
          light: '#94a3b8', // Slate 400
          snow: '#f1f5f9', // Slate 100
        },
        // Spring Palette (The Goal State)
        spring: {
          primary: '#10b981', // Emerald 500
          bloom: '#f43f5e', // Rose 500
          sun: '#f59e0b', // Amber 500
          sky: '#0ea5e9', // Sky 500
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}