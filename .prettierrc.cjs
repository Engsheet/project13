module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
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
};
