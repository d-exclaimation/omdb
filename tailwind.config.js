/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chart: "rgb(173, 250, 29)"
      },
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
        "to-full-height": "to-full-height 1s cubic-bezier(0.4, 0, 0.6, 1)"
      },
      keyframes: {
        "handdrawn": {
          to: {
            strokeDashoffset: 0,
          }
        },
        "to-full-height": {
          from: {
            height: "0",
          },
        }
      }
    },
  },
  plugins: [],
}

