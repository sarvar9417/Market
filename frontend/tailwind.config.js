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
      darkblue: {
        100: "#a9c0ef",
        200: "#86a7e9",
        300: "#648ee3",
        400: "#4175dc",
        500: "#265ecf",
        600: "#204fac",
        700: "#193f8a",
        800: "#0F2552",
        900: "#071f45",
      },
      red: {
        100: "#fab29e",
        200: "#f89377",
        300: "#F67451",
        400: "#F4562a",
        500: "#F5653D",
        600: "#E93C0C",
        700: "#C2320A",
        800: "#9B2808",
        900: "#741E06",
      },

      orange: {
        100: "#FFE2C2",
        200: "#F0CEAC",
        300: "#FFCE99",
        400: "#FFBA70",
        500: "#FFA647",
        600: "#FF931F",
        700: "#F57E00",
        800: "#CC6900",
        900: "#A35400",
      },

      green: {
        100: "#D4EDDB",
        200: "#B7E1C3",
        300: "#9AD5AB",
        400: "#7EC993",
        500: "#61BD7B",
        600: "#48AD65",
        700: "#3C9054",
        800: "#307343",
        900: "#245632",
      },

      blue: {
        100: "#C2F8FF",
        200: "#99F3FF",
        300: "#70EEFF",
        400: "#47EAFF",
        500: "#1FE5FF",
        600: "#00D8F5",
        700: "#00B4CC",
        800: "#0090A3",
        900: "#006C7A",
      },

      purple: "#e42c6a",
      alo24: "#00A2B7",
      // white: "#FFFFFF",
      // black: "#000000",
      // orange: "#F7C200",
      // blue: "#00A2B7",
      // lightblue: "#0dcaf0",
      // gray: "#75869C",
      // darkblue: "#02073E",
      // lightyellow: "#FBCE82",
      // lightgray: "#E5E5E5",
      // violet: "#BFA1F8",
      // green: "#53bac1",
      // red: "#DB0038",
    },
  },
  plugins: [],
};
