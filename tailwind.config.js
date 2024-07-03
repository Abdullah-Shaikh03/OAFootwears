/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#1223f6',
        'secondary':'#f1101a',
        'tertiary':'#751c93',
      },
      fontFamily:{
        'heading':['Playwrite FR Moderne', 'cursive'],
        'body':['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
