/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bgAppLight: "#E5E8EF",
        theme: "#006DFF",
        bgContainerDark: "#100F14",
      },
    },
  },
  plugins: [],
};
