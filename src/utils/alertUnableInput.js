import { pb } from "@/api/pocketbase";
import { isRegValid, alertReg, alertMessage } from "@u/index";

export async function isUsed(createdData) {
  if (!createdData) return;
  const fieldData = await pb.collection("users").getFullList();
  const nickNames = fieldData.map((item) => item.nickname);
  const emails = fieldData.map((item) => item.email);
  const userNames = fieldData.map((item) => item.username);

  if (nickNames.includes(createdData.nickname)) {
    alertMessage(`이미 사용중인 닉네임이 있습니다.`);
    return true;
  }
  if (emails.includes(createdData.email)) {
    alertMessage(`이미 사용중인 이메일이 있습니다.`);
    return true;
  }
  if (userNames.includes(createdData.username)) {
    alertMessage(`이미 사용중인 아이디가 있습니다.`);
    return true;
  }
}

export function alertUnableInput(data) {
  for (const [key, value] of Object.entries(data)) {
    if (!isRegValid(key, value)) {
      alertReg(key);
      return true;
    }

    if (!value) {
      alertMessage("비어있는 내용이 있습니다. 확인해주세요.");
      return true;
    }
  }
}
