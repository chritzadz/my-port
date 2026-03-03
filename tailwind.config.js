/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ivory: "#FAFAF8",
        stone: "#E7E5E0",
        muted: "#9A9A98",
        charcoal: "#2D2D2D",
      },
    },
  },
  plugins: [],
};
