/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Corrected typo: "//" → "*/"
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        body: ['Libre Baskerville', 'serif'],
        garamond: ['Cormorant Garamond', 'serif'],
      },
    },
  },
  plugins: [],
};

