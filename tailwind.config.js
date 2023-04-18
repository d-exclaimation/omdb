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
      animation: {
        "handdrawn": "2s ease-in-out 0.5s 1 normal forwards running handdrawn",
      },
      keyframes: {
        "handdrawn": {
          to: {
            strokeDashoffset: 0,
          }
        }
      }
    },
  },
  plugins: [],
}

