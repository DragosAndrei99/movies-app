/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './.storybook/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.stories.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

