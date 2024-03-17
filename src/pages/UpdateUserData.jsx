import { useState } from "react";
import { pb, read, update } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";
import { isRegValid, alertReg, alertMessage } from "@u/index";
import SignInput from "@c/SignInUp/SignInput";
import SignPhoto from "@c/SignInUp/SignPhoto";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import Header from "@l/Header";
import MetaData from "@c/MetaData";
import { GoX } from "react-icons/go";
import { Link } from "react-router-dom";

function UpdateUserData() {
  const userInfo = pb.authStore.model;
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [email, setEmail] = useState(userInfo.email);

  const updateData = {
    avatar: avatar,
    nickname: nickname,
    email: email,
  };

  let formData = new FormData();

  async function isUsed(field, value) {
    const fieldData = await read("users", field);
    const fieldObj = fieldData.items;
    const fieldArr = fieldObj.map((item) => item[field]);
    return fieldArr.includes(value);
  }

  function appendFormData() {
    for (const [key, value] of Object.entries(updateData)) {
      formData.append(key, value);
    }
  }

  async function handleUserDataUpdate() {
    for (const [key, value] of Object.entries(updateData)) {
      if (!(value === userInfo[key])) {
        if (await isUsed(key, value)) {
          alertMessage(`이미 사용중인 닉네임입니다.`);
          return;
        }
        if (!isRegValid(key, value)) {
          alertReg(key);
          return;
        }
      }
    }

    appendFormData();
    await update("users", userInfo.id, formData);
    navigate("/");
  }
  const metaData = {
    title: "Best Place - 업데이트",
    description: "유저 정보 업데이트",
    keywords: ["유저", "정보", "업데이트"],
    image: "/logo.svg",
  };

  return (
    <div className="caret-transparent">
      <MetaData props={metaData} />
      <Header />

      <main className="relative mx-auto max-w-3xl p-3">
        <Link to="/" className="group absolute right-3.5 mr-1 inline" title="설정 닫기">
          <GoX className="text-3xl hover:text-primary group-focus:text-primary" />
        </Link>

        <div className="mx-auto max-w-sm">
          <h2 className="mt-3 text-center text-2xl font-bold">프로필 수정</h2>
          <SignForm>
            <SignPhoto labelValue="프로필 사진 변경" ariaLabel="프로필 사진을 변경하세요." inputValue={setAvatar} />
            <SignInput
              labelValue="닉네임"
              placeHolder={userInfo.nickname}
              inputValue={setNickname}
            />
            <SignInput
              labelValue="이메일"
              placeHolder={userInfo.email}
              inputValue={setEmail}
            />
            <input type="text" className="hidden"></input>
          </SignForm>

          <div className="mt-6 flex items-center justify-end gap-2">
            <p className="text-lg font-bold">프로필 변경</p>
            <SignButton ariaLabel="프로필 수정" handleEvent={() => handleUserDataUpdate()} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default UpdateUserData;
