/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.jsx", "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#68B0AB",
        primaryLight: "#B2DFDB",
        secondary: "#3949AB",
      },
      fontFamily: {
        suit: ["SUIT Variable"],
      },
      backgroundImage: {
        "check-hover": 'url("/button-check-hover.svg")',
        check: 'url("/button-check.svg")',
        "checked-hover": 'url("/button-checked-hover.svg")',
        checked: 'url("/button-checked.svg")',
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [],
};
