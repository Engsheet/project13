import { pb, setLogOut } from "@/api/pocketbase";
import PopUpModal from "@/components/PopUpModal";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

function Header() {
  const [openModal, setOpenModal] = useState(false);
  const handleLogout = () => {
    setLogOut();
    location.href = "/";
  };

  return (
    <header className="bg-primary text-white">
      <PopUpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="정말 로그아웃 하시겠습니까?"
        actionTitle="확인"
        handleEvent={handleLogout}
      />
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 py-2">
        <h1>
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="베스트 플레이스" className="h-6 w-6" />
            <div className="ml-2 text-lg font-bold">
              <span className="font-black text-secondary">B</span>est{" "}
              <span className="font-black text-secondary">P</span>lace
            </div>
          </Link>
        </h1>
        <div className=" flex items-center gap-2">
          <Link to={"/update-user-data"} className="mr-1">
            <FaUserEdit aria-label="프로필 수정" title="프로필 수정" className="text-2xl text-secondary" />
          </Link>
          <button type="button" onClick={() => setOpenModal(true)} className="mr-2">
            <MdOutlineLogout aria-label="로그아웃" title="로그아웃" className="text-2xl text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
