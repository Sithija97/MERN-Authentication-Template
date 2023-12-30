/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        layout: "calc(100vh - 3rem)",
      },
    },
  },
  plugins: [],
};
