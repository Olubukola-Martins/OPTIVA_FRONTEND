/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--app-color-primary)",
        secondary: "var(--app-color-secondary)",
      },
      colors: {
        primary: "var(--app-color-primary)",
        secondary: "var(--app-color-secondary)",
        accent: "var(--app-color-accent)",
      },
    },
  },
  plugins: [],
};
