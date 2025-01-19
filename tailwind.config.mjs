import plugin from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.625rem",
      },
      fontFamily: {
        sans: ["Noto Sans KR", "sans-serif"],
        baskin: ["BaskinRobbins", "Noto Sans KR"],
      },
      screens: {
        mb: "375px",
        tb: "744px",
        lt: "1200px",
        tablet: { max: "1199px" },
        // => @media (max-width: 1199px) {...}
        mobile: { max: "743px" },
        // => @media (max-width: 743px) {...}
      },
      colors: {
        gray: {
          100: "hsl(var(--gray-100))",
          300: "hsl(var(--gray-300))",
          400: "hsl(var(--gray-400))",
          500: "hsl(var(--gray-500))",
        },
        grade: {
          'common': '#EFFF04',
          'rare': '#29C9F9',
          'super-rare': '#A77EFF',
          'legendary': '#FF2A6A',
        },
        customRed: "#FF483D",
        customBlue: "#29C9F9",
        customPurple: "#A77EFF",
        customPink: "#FF2A6A",
        customMain: "#EFFF04",
        customGrey01: "#A4A4A4", // grey (마켓플레이스)
        customGrey02: "#EEEEEE", // grey (border)
        customGrey03: "#5A5A5A", // grey (title border)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "calc(var(--radius) / 2)",
        md: "calc(var(--radius) / 4)",
        sm: "calc(var(--radius) / 8)",
      },
      spacing: {
        13: "3.25rem",
        18: "4.5rem",
        55: "13.75rem",
      },
    },
  },
  plugins: [ plugin ],
};