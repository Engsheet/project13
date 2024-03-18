import { create, setLogIn } from "@/api/pocketbase";
import { alertMessage, alertUnableInput, isUsed } from "@u/index";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MetaData from "@c/MetaData";
import SignButton from "@c/SignInUp/SignButton";
import SignContents from "@c/SignInUp/SignContents";
import SignForm from "@c/SignInUp/SignForm";
import SignInput from "@c/SignInUp/SignInput";
import SignLogo from "@c/SignInUp/SignLogo";
import SignTitle from "@c/SignInUp/SignTitle";
import NavigateButton from "@c/SignInUp/NavigateButton";
import SignLayout from "@l/SignLayout";
import { useEffect } from "react";

function Register() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");

  const createData = {
    nickname: nickname,
    username: id,
    email: email,
    password: pw,
    passwordConfirm: pwCheck,
    emailVisibility: true,
  };

  async function handleRegister() {
    if (alertUnableInput(createData)) return;

    if (pw !== pwCheck) {
      return alertMessage("비밀번호가 일치하지 않습니다");
    }

    const used = await isUsed(createData);
    if (used) return;

    const data = await create("users", createData);
    data && (await create("follow", { owner: data.id }));
    await setLogIn([id, pw]);
    globalThis.location.href = "/";
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleRegister();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  });
  const metaData = {
    title: "Best Place - 회원가입",
    description: "Best Place 회원가입 페이지",
    keywords: ["회원가입", "즉시접속"],
    image: "/logo.svg",
  };

  return (
    <SignContents>
      <MetaData props={metaData} />
      <SignLayout>
        <SignLogo />
        <SignForm>
          <SignInput labelValue="아이디" placeHolder="4~20자리 영문/숫자로 입력해주세요." inputValue={setId} />
          <SignInput
            labelValue="닉네임"
            placeHolder="2~10자리 문자로 입력해주세요."
            inputValue={setNickname}
          />
          <SignInput labelValue="이메일" placeHolder="이메일을 입력하세요." inputValue={setEmail} />
          <SignInput
            labelValue="비밀번호"
            placeHolder="숫자/영문/특문 8~16글자로 입력해주세요."
            inputValue={setPw}
            type="password"
          />
          <SignInput
            labelValue="비밀번호 확인"
            placeHolder="비밀번호를 다시 입력해주세요."
            inputValue={setPwCheck}
            type="password"
          />
        </SignForm>

        <div className="mt-4 grow">
          <p className="text-xs text-gray-600">이미 Best Place 회원이신가요?</p>
          <NavigateButton value="로그인으로 돌아가기" handleEvent={() => navigate("/")} />
        </div>

        <div className="flex items-center justify-end gap-2">
          <SignTitle value="회원가입" />
          <SignButton ariaLabel="회원가입" handleEvent={() => handleRegister()} />
        </div>
      </SignLayout>
    </SignContents>
  );
}

export default Register;
