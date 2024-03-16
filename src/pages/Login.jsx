import { read, setLogIn } from "@/api/pocketbase";
import { alertMessage } from "@u/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SignButton from "@c/SignInUp/SignButton";
import SignContents from "@c/SignInUp/SignContents";
import SignForm from "@c/SignInUp/SignForm";
import SignInput from "@c/SignInUp/SignInput";
import SignLogo from "@c/SignInUp/SignLogo";
import SignTitle from "@c/SignInUp/SignTitle";
import MetaData from "@c/MetaData";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  let idPw = [id, pw];

  async function handleLogin() {
    try {
      await setLogIn(idPw);
      globalThis.location.href = "/";
    } catch {
      alertMessage("사용자 정보가 없습니다", "❌");
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleLogin();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  const metaData = {
    title: "Best Place - 로그인",
    description: "Best Place 로그인 페이지",
    keywords: ["로그인", "회원"],
    image: "/logo.svg",
  };

  return (
    <SignContents>
      <MetaData props={metaData} />
      <SignLogo />
      <SignTitle value="로그인" />

      <SignForm>
        <SignInput labelValue="아이디" ariaText="아이디 입력창" placeHolder="아이디를 입력하세요" inputValue={setId} />

        <SignInput
          labelValue="비밀번호"
          ariaText="비밀번호 입력창"
          placeHolder="비밀번호를 입력하세요"
          inputValue={setPw}
          type="password"
        />
      </SignForm>

      <div className="flex w-full max-w-3xl flex-col gap-2">
        <SignButton value="로그인" handleEvent={() => handleLogin()} bgColor="bg-white" textColor="text-black" />
        <SignButton value="회원가입" handleEvent={() => navigate("/Register")} />
      </div>
    </SignContents>
  );
}

export default Login;
