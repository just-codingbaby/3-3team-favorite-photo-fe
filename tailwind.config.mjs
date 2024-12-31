/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        baskin: ["BaskinRobbins", "Noto Sans KR"], //  className="font-baskin" 으로 사용
      },
      screens: {
        mb: "375px",
        tb: "744px",
        lt: "1200px",
      },
      colors: {
        //시그마 디자인 시안에서 확인하고 커스텀으로 만든 컬러들입니다
        //className="bg-customColor"
        customRed: "#FF483D", // RED
        customBlue: "#29C9F9", // BLUE
        customPurple: "#A77EFF", //PURPLE
        customPink: "#FF2A6A", //PINK
        customMain: "#EFFF04", //main (노란색)
      },
    },
  },
  plugins: [],
};
