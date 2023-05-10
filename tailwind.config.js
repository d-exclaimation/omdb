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
        "to-full-height": "to-full-height 1s cubic-bezier(0.4, 0, 0.6, 1)",
        hide: 'hide 100ms ease-in',
        slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        swipeOut: 'swipeOut 100ms ease-out',
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
        },
        hide: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          from: { transform: 'translateX(calc(-100% - var(--viewport-padding)))' },
          to: { transform: 'translateX(0)' },
        },
        swipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(-100% - var(--viewport-padding)))' },
        },
      },
    },
  },
  plugins: [],
}

