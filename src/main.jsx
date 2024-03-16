import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/style/tailwind.css";

export async function autoA11yTest({ locale = "ko", timeout = 1000 } = {}) {
  if (process.env.NODE_ENV.includes("development")) {
    try {
      const { default: axe } = await import("@axe-core/react");
      let lang = null;
      if (locale !== "en") {
        lang = await import(`axe-core/locales/ko.json`);
        // 언어 설정(영어: en, 한글: ko)
      }
      axe(React, ReactDOM, timeout, lang ? { locale: lang } : {});
    } catch (error) {
      console.error(error.message);
    }
  }
}

// 한국어 출력
// autoA11yTest();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
