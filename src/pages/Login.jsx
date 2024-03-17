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
import SignLayout from "@/layout/SignLayout";
import NavigateButton from "@/components/SignInUp/navigateButton";

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
      <SignLayout>
        <div>
          <SignLogo />
          <p className="mb-4 text-sm font-light leading-7 sm:text-base sm:leading-7 ">
            마음에 드는 식당이 있나요?
            <br />
            <span className="font-semibold underline hover:text-primary hover:decoration-primary">Best Place</span>로
            예약하고 저장하세요!
          </p>
        </div>

        <div className="flex w-full grow flex-col gap-1 sm:gap-3">
          <SignForm>
            <SignInput labelValue="아이디" placeHolder="아이디를 입력하세요." inputValue={setId} />
            <SignInput labelValue="비밀번호" placeHolder="비밀번호를 입력하세요." inputValue={setPw} type="password" />
          </SignForm>

          <div className="mt-4">
            <p className="text-xs text-gray-600">아직 Best Place 회원이 아니신가요?</p>
            <NavigateButton handleEvent={() => navigate("/Register")} value="회원가입" />
          </div>

          <p className="flex flex-col text-right italic text-gray-600 text-opacity-60">
            <span className="text-sm">Test Account</span>
            <span className="mt-1 text-xs">
              ID : best1234
              <br />
              PW : best1234
            </span>
          </p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <SignTitle value="로그인" />
          <SignButton ariaLabel="로그인" handleEvent={() => handleLogin()} />
        </div>
      </SignLayout>
    </SignContents>
  );
}

export default Login;
