/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading:['Libre Baskerville', 'serif'],
        primary: ["Rubik", "sans-serif"],
      },
      colors:{
        primary:"#a0153e",
        secondary:"#00224d"
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
