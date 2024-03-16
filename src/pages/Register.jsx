import { create, setLogIn } from "@/api/pocketbase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertMessage, alertUnableInput, isUsed } from "@u/index";

import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import SignContents from "@c/SignInUp/SignContents";
import SignLogo from "@c/SignInUp/SignLogo";
import { useEffect } from "react";
import MetaData from "@c/MetaData";

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
      <SignLogo />
      <SignTitle value="회원가입" />
      <SignForm>
        <SignInput labelValue="별명" ariaText="별명 입력창" placeHolder="별명을 입력하세요" inputValue={setNickname} />
        <SignInput labelValue="아이디" ariaText="아이디 입력창" placeHolder="아이디를 입력하세요" inputValue={setId} />
        <SignInput
          labelValue="이메일"
          ariaText="이메일 입력창"
          placeHolder="이메일을 입력하세요"
          inputValue={setEmail}
        />
        <SignInput
          labelValue="비밀번호"
          ariaText="비밀번호 입력창"
          placeHolder="비밀번호를 입력하세요"
          inputValue={setPw}
          type="password"
        />
        <SignInput
          labelValue="비밀번호 확인"
          ariaText="비밀번호 재입력창"
          placeHolder="비밀번호를 다시 입력하세요"
          inputValue={setPwCheck}
          type="password"
        />
      </SignForm>

      <div className="flex w-full max-w-3xl flex-col gap-2">
        <SignButton value="회원가입" handleEvent={() => handleRegister()} bgColor="bg-white" textColor="text-black" />
        <SignButton value="로그인으로 돌아가기" handleEvent={() => navigate("/")} />
      </div>
    </SignContents>
  );
}

export default Register;
