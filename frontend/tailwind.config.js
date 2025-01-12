/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      formBg: "#38405F",
      websiteBg: "#000000",
      homeText: "#FFFFFF",
      joinBtn: "#d70d3d",
      inputBg: "#8B939C",
      textArea: "#585757",
    },
    extend: {
      borderWidth: {
        1.5: "1.5px",
      },
      boxShadow: {
        black: "0px 4px 6px rgba(0, 0, 0, 0.5)", // Custom black shadow
      },
      fontFamily: {
        "irish-grover": ['"Irish Grover"', "cursive"],
      },
    },
  },
  plugins: [],
};
