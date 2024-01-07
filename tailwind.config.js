const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        thin: 100,
        extraLight: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 800,
      },
      fontFamily: {
        sans: [
          "Montserrat-Regular",
          "Montserrat-Bold",
          "Montserrat-Light",
          "Montserrat-Medium",
          "Montserrat-ExtraBold",
          "Montserrat-ExtraLight",
          "Montserrat-SemiBold",
          "Montserrat-Thin",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
