import { useState } from "react";
import { pb, read, update } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";
import { isRegValid, alertReg, alertMessage } from "@u/index";
import SignTitle from "@c/SignInUp/SignTitle";
import SignInput from "@c/SignInUp/SignInput";
import SignPhoto from "@c/SignInUp/SignPhoto";
import SignButton from "@c/SignInUp/SignButton";
import SignForm from "@c/SignInUp/SignForm";
import Header from "@l/Header";
import MetaData from "@c/MetaData";

function UpdateUserData() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(pb.authStore.model.avatar);
  const [nickname, setNickname] = useState(pb.authStore.model.nickname);
  const [username, setUsername] = useState(pb.authStore.model.username);
  const [email, setEmail] = useState(pb.authStore.model.email);

  const updateData = {
    avatar: avatar,
    nickname: nickname,
    username: username,
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
      if (!(value === pb.authStore.model[key])) {
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
    await update("users", pb.authStore.model.id, formData);
    navigate("/");
  }
  const metaData = {
    title: "Best Place - 업데이트",
    description: "유저 정보 업데이트",
    keywords: ["유저", "정보", "업데이트"],
    image: "/logo.svg",
  };

  return (
    <div className="relative min-h-screen pb-28">
      <MetaData props={metaData} />
      <Header />
      <main className="mx-auto max-w-3xl px-3 py-10">
        <SignTitle value="프로필 설정" />

        <SignForm>
          <SignPhoto
            labelValue=""
            ariaText="새 프로필 사진 입력창"
            placeHolder=""
            inputValue={setAvatar}
            bgColor="bg-white"
            textColor="text-black"
            placeHolderColor="placeholder-black"
          />
          <SignInput
            labelValue="별명"
            ariaText="별명 입력창"
            placeHolder="새 별명을 입력하세요"
            type="text"
            inputValue={setNickname}
            bgColor="bg-white"
            textColor="text-black"
            placeHolderColor="placeholder-gray-400"
          />
          <input type="text" className="hidden"></input>
        </SignForm>

        <div className="flex gap-3 py-6">
          <SignButton value="취소" handleEvent={() => navigate("/")} bgColor="bg-white" textColor="text-red-600" />
          <SignButton
            value="수정완료"
            handleEvent={() => handleUserDataUpdate()}
            bgColor="bg-primary"
            textColor="text-white"
          />
        </div>
      </main>
    </div>
  );
}

export default UpdateUserData;
