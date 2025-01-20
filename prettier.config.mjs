const config = {
  printWidth: 100,
  trailingComma: 'all', // 기본값
  tabWidth: 2, // 기본값
  semi: true, // 일부 코드에서 라인의 시작 부분에 세미 콜론 추가
  singleQuote: true,
  bracketSpacing: true, // 기본값. true인 경우 {foo:bar}는 { foo: bar }로 변환됨
  arrowParens: 'always', // // 화살표 함수 매개변수에 항상 괄호를 사용
  useTabs: false, // 기본값
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss'
  ],
  tailwindAttributes: ['classNames'],
  tailwindStylesheet: './tailwind.config.mjs',
  tailwindFunctions: ['cn'],
  importOrder: [
    "^react$",
    "^react-dom$",
    "^react-router-dom$",
    "",
    "^react(.*)$",
    "",
    "<BUILTIN_MODULES>",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/store/(.*)$",
    "",
    "^@/api/(.*)$",
    "",
    "^@/hooks/(.*)$",
    "",
    "^@/utils/(.*)$",
    "^@/util/(.*)$",
    "",
    "^@/constants",
    "^@/constants/(.*)$",
    "",
    "^@/pages/(.*)$",
    "",
    "^@/services/(.*)$",
    "",
    "^@/components/(.*)$",
    "",
    "^@/assets/(.*)$",
    "",
    "^[./]"
  ],
};
export default config;

// ['^@', '^[a-zA-Z0-9-]+', '^[./]'],