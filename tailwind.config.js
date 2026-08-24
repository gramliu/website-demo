/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgcolor: {
          primary: "rgb(var(--color-canvas-rgb) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary-rgb) / <alpha-value>)",
          highlight: "rgb(var(--color-sandstone-rgb) / <alpha-value>)",
          faded: "rgb(var(--color-text-muted-rgb) / <alpha-value>)",
        },
        divider: "rgb(var(--color-sandstone-rgb) / 0.28)",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", "sans-serif"],
        mono: ["var(--font-noto-sans-mono)", "monospace"],
        serif: ["var(--font-roboto-slab)", "serif"],
      },
    },
  },
  plugins: [],
};
