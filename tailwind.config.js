/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'colormode-page': "url('./src/assets/images/colormode-page.webp')",
      },
      fontFamily: {
        satoshi: ["Satoshi-Variable", ...defaultTheme.fontFamily.sans],
        sans: ["Satoshi-Bold", ...defaultTheme.fontFamily.sans],
        "santoshi-light": ["Satoshi-Light", ...defaultTheme.fontFamily.sans],
        "santoshi-regular": ["Satoshi-Regular"],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      screens: {
        'sm': '640px',   // Small screens, mobile phones
        'md': '768px',   // Medium screens, tablets
        'lg': '1024px',  // Large screens, desktops
        'xl': '1280px',  // Extra large screens, large desktops
      },
      colors: {
        nigga: "rgba(var(--nigga))",
        niggi: "rgba(var(--niggi))",
      }
    },
  },
  darkMode: 'class',  // Dark mode configuration class, selector, media
  plugins: [],
};
