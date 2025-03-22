/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-sans': ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 6s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(var(--tw-rotate))',
            opacity: '0.1'
          },
          '50%': { 
            transform: 'translateY(-10px) rotate(var(--tw-rotate))',
            opacity: '0.15'
          },
        },
      },
    },
  },
  plugins: [],
}; 