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
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3 py-1.5">
        <h1>
          <Link to="/" className="group flex items-center">
            <img src="/logo.svg" alt="베스트 플레이스" className="h-8 w-8" />
            <div className="ml-2 text-xl font-bold decoration-secondary group-hover:underline group-focus:underline">
              <span className="text-shadow-lg text-shadow font-black text-secondary">B</span>est{" "}
              <span className="font-black text-secondary">P</span>lace
            </div>
          </Link>
        </h1>
        <div className=" flex items-center gap-2">
          <Link to={"/update-user-data"} className="mr-1 group">
            <FaUserEdit
              aria-label="프로필 수정"
              title="프로필 수정"
              className="text-2xl text-white group-hover:text-secondary group-focus:text-secondary"
            />
          </Link>
          <button type="button" onClick={() => setOpenModal(true)} className="mr-2 group">
            <MdOutlineLogout
              aria-label="로그아웃"
              title="로그아웃"
              className="text-2xl text-white group-hover:text-secondary group-focus:text-secondary"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
