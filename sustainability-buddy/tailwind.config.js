/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#10B981", // green-500
        },
        secondary: {
          blue: "#3B82F6", // blue-500
        },
        accent: {
          amber: "#F59E0B", // amber-500
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
        },
        screens: {
          sm: "100%",
          md: "768px",
          lg: "1024px",
        },
      },
    },
  },
  plugins: [],
}

