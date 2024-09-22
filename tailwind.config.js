/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./**/*.tsx",
    "!./**/node_modules/**/*.{html,js,ts,tsx,jsx}"
  ],
  plugins: []
}