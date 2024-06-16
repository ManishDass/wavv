/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',   // Small screens, mobile phones
        'md': '768px',   // Medium screens, tablets
        'lg': '1024px',  // Large screens, desktops
        'xl': '1280px',  // Extra large screens, large desktops
      }
    },
  },
  plugins: [],
}