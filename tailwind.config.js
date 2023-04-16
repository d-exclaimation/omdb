/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth: {
        screen: "100vw",
      },
      minHeight: {
        screen: "100vh",
      },
      data: {
        "selected": "selected='true'"
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
}

