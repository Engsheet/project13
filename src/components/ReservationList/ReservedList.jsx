import { update } from "@/api/pocketbase";
import { calcDay, dateFormat, timeFormat } from "@/utils";
import { Dropdown } from "flowbite-react";
import { array, object } from "prop-types";
import { BsCalendarWeek } from "react-icons/bs";
import { MdMoreVert } from "react-icons/md";
import PopUpModal from "../PopUpModal";
import { useState } from "react";

//@ 현재 예약중 리스트
function ReservedList({ reservedList, userInfo }) {
  const [openModal, setOpenModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);

  async function handleClickVisitBtn(e) {
    await update("reservation", e.target.closest("li").id, { visited: true });
    location.reload();
  }

  async function handleClickCancelBtn(e) {
    setCancelTarget(e.target.closest("li").id);
    setOpenModal(true);
  }

  async function handleClickCancelPopUp() {
    await update("reservation", cancelTarget, { canceled: true });
    location.reload();
  }

  return (
    <div className="border-b border-dashed border-gray-500/50 pb-8">
      {reservedList.length !== 0 ? (
        <>
          <h3 className="mb-4 mt-2 text-lg font-bold">
            <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
            <span className="mx-0.5 text-secondary decoration-secondary hover:underline">{userInfo.nickname}</span>님이
            현재 예약한 정보에요
          </h3>
          <ul>
            {reservedList.map((item, index) => (
              <li key={index} className="my-2 rounded-2xl border-2 border-primary p-4" id={item.id}>
                <PopUpModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  modalTitle="정말 예약을 취소하시겠어요?"
                  actionTitle="확인"
                  handleEvent={handleClickCancelPopUp}
                />

                <p className="inline rounded-xl bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
                  {calcDay(item.date)}
                </p>
                <div className="float-right">
                  <Dropdown inline arrowIcon={null} label={<MdMoreVert />}>
                    <button
                      type="button"
                      className="hover:text-primaryLight mx-3 block border-b border-gray-500 bg-transparent py-1 text-center text-sm font-semibold"
                      onClick={handleClickVisitBtn}
                    >
                      방문 확인
                    </button>
                    <button
                      type="button"
                      className="hover:text-primaryLight mx-3 block bg-transparent py-1 text-center text-sm font-semibold"
                      onClick={handleClickCancelBtn}
                    >
                      예약 취소
                    </button>
                  </Dropdown>
                </div>
                <h4 className="mt-1 font-bold">{item.expand.place.title}</h4>
                <p className="text-sm font-light">
                  {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span>
                  {timeFormat(item.date)}
                </p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3 className="mb-4 mt-2 text-lg font-bold">
          <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
          <span className="mx-0.5 text-secondary">{userInfo.nickname}</span>님이 현재 예약한 장소는 없어요!
        </h3>
      )}
    </div>
  );
}

ReservedList.propTypes = {
  reservedList: array,
  userInfo: object,
};

export default ReservedList;
