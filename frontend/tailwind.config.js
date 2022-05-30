module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xsm: "320px",

      sm: "520px",
      // => @media (min-width: 640px) { ... }

      md: "798px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      orange: "#FFC059",
      blue: "#56BBD0",
      gray: "#75869C",
      darkblue: "#02073E",
      lightyellow: "#FBCE82",
      lightgray: "#E5E5E5",
      violet: "#BFA1F8",
      green: "#36BCA1",
      red: "#F39681",
    },
  },
  plugins: [],
};
