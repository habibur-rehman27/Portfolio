/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
        },
        hairline: 'var(--border-hairline)',
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          lime: 'var(--accent-lime)',
          'lime-hover': 'var(--accent-lime-hover)',
          'lime-glow': 'var(--accent-lime-glow)',
          cyan: 'var(--accent-cyan)',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'lime-glow': '0 0 25px -5px var(--accent-lime-glow)',
        'lime-glow-sm': '0 0 15px -3px var(--accent-lime-glow)',
        'cyan-glow': '0 0 20px -4px var(--accent-cyan-glow)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};

