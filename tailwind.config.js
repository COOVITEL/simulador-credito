/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'distorted': '0 15px 30px rgba(0,0,0,0.25)', 
      }
    },
  },
  plugins: [],
}

