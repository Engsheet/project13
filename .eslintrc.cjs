module.exports = {
  root: true,
  env: { node: true, browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "node_modules/"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "prettier/prettier": [
      "off",
      {
        printWidth: 120, // 행폭 설정 (줄 길이가 설정 값보다 길어지면 자동 개행)
        tabWidth: 2, // 탭 너비 설정
        useTabs: false, // 탭 사용 여부
        arrowParens: "always", // 화살표 함수 식 매개변수 () 생략 여부 (ex: (a) => a)
        singleQuote: false, // 싱글 인용 부호(') 사용 여부
        semi: true, // 세미콜론(;) 사용 여부
        quoteProps: "as-needed", // 객체 속성 key 값에 인용 부호 사용 여부 (ex: { 'key': 'xkieo-xxxx' })
        trailingComma: "es5", // 객체나 배열의 마지막 요소 뒤에 쉼표를 추가
        bracketSpacing: true, // 객체 표기 괄호 사이 공백 추가 여부 (ex: { foo: bar })
        proseWrap: "preserve", // 산문 래핑 설정
        endOfLine: "auto", // 공백문자(사용자 환경에 따라 에러가 표시되지 않도록 설정)
        htmlWhitespaceSensitivity: "css", // html 태그 사이 공백 설정
        // ex : 1<b> 2 <b>3 -> 1<b>2<b>3
        bracketSameLine: false, // 닫는 괄호(>) 위치 설정
        // ex: <div
        //       id="unique-id"
        //       class="contaienr"
        //     >
      },
    ],
    "comma-dangle": ["warn", "only-multiline"], // 객체나 배열의 마지막 요소 뒤에 쉼표를 추가
    "no-unused-vars": "warn", // 사용되지 않는 변수가 있을 경우, 경고를 출력합니다.
    "no-multi-spaces": [
      "warn", // 공백문자의 사용을 제한하여 가독성을 높입니다.
      {
        exceptions: { Property: true }, // 그러나 속성 선언에서는 예외적으로 공백문자를 허용하여 가독성을 높입니다.
      },
    ],
  },
};
