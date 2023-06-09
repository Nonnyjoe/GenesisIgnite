/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      pop: ["Poppins", "sans-serif"],
      headers: ["Oswald"],
      contents: ["Lato"],
      EudoxusSansBold: ["EudoxusSans-Bold"],
      EudoxusSansLight: ["EudoxusSans-Light"],

      // header1: ["Eudoxus sans"],
    },
  },
  plugins: [],
};
