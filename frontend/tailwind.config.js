module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        spotify: "#1DB954",
        "spotify-accent": "#127836",
      },
    },
  },
  daisyui: {
    themes: [
      "forest",
      {
        purple: {
          primary: "#DDA0F5",
          neutral: "#161A1D",
          "base-100": "#482B4A",
          info: "#5BA8EC",
          success: "#189084",
          warning: "#EE8D17",
          error: "#FB3C69",
        },
      },
    ],
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
