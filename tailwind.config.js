module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        controller:
          "url('https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_960_720.jpg')",
        puzzel:
          "url('https://cdn.pixabay.com/photo/2018/03/13/22/53/puzzle-3223941_960_720.jpg')",
        game: "url('https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg')",
        chess:
          "url('https://cdn.pixabay.com/photo/2016/11/21/16/48/board-game-1846400_960_720.jpg')",
      },
    },
    maxHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "80per": "80%",
      "90per": "90%",
    },
    minHeight: {
      fill: "-webkit-fill-available",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
