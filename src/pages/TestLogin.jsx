import { pb, setLogIn, setLogOut } from "@/api/pocketbase";
import SignTitle from "@c/SignInUp/SignTitle";
import SignButton from "@c/SignInUp/SignButton";

function TestLogin() {
  let idPw1 = ["abc", "12341234"];
  let idPw2 = ["www", "12341234"];

  async function setAuthAdmin(pb) {
    const authData = await pb.admins.authWithPassword("qqqqmmss11@gmail.com", "asdf@@1234");
  }

  function getLogger(pb) {
    pb.authStore.model?.username ? console.log(pb.authStore.model.username) : console.log("no user");
  }

  function getLocalStorageAuth() {
    const pocketbase_auth = JSON.parse(localStorage.getItem("pocketbase_auth"));
    pocketbase_auth ? console.log(pocketbase_auth.model) : console.log("no Local Storage");
  }

  return (
    <>
      <SignTitle value="테스트 로그인" />
      <SignButton value="로그인 - 관리자, 로컬 스토리지로만 확인가능" handleEvent={() => setAuthAdmin(pb)} />
      <br />
      <SignButton value="로그인 - abc" handleEvent={() => setLogIn(idPw1)} />
      <br />
      <SignButton value="로그인 - www" handleEvent={() => setLogIn(idPw2)} />
      <br />
      <SignButton value="로그 아웃" handleEvent={() => setLogOut()} />
      <br />
      <SignButton value="유저 확인" handleEvent={() => getLogger(pb)} />
      <br />
      <SignButton value="로컬 스토리지 확인" handleEvent={() => getLocalStorageAuth()} />
    </>
  );
}

export default TestLogin;
