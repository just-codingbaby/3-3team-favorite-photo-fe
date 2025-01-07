/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        baskin: ["BaskinRobbins", "Noto Sans KR"], //  className="font-baskin" 으로 사용
      },

      colors: {
        //시그마 디자인 시안에서 확인하고 커스텀으로 만든 컬러들입니다
        //className="bg-customColor"
        customRed: "#FF483D", // RED
        customBlue: "#29C9F9", // BLUE
        customPurple: "#A77EFF", //PURPLE
        customPink: "#FF2A6A", //PINK
        customMain: "#EFFF04", //main (노란색)
        customGrey01: "#A4A4A4", // grey (마켓플레이스)
        customGrey02: "##EEEEEE", // grey (border)
        customGrey03: "#5A5A5A", // grey (title border)
      },

      screens: {
        tablet: { max: "1199px" },
        // => @media (max-width: 1199px) {...}
        mobile: { max: "743px" },
        // => @media (max-width: 743px) {...}
      },
    },
  },
  plugins: [],
};
