/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all files that contain Nativewind classes.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          'pale-green': '#A8BBA3',
          'off-white': '#F7F4EA',
          'pink-white': '#EBD9D1',
          'pale-brown': '#B87C4C',
        },
      },
    },
    plugins: [],
}