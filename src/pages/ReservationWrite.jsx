import { pb } from "@/api/pocketbase";
import { useNavigate } from "react-router-dom";
import { isBefore } from "date-fns/esm";
import { GoX } from "react-icons/go";
import { useState } from "react";
import Header from "@l/Header";
import { alertMessage, isEmailRegValid, isTelRegValid } from "@u/index";
import useReservation from "@h/useReservation";
import ReservationGuestCount from "@c/Reservation/ReservationGuestCount";
import ReservationGuestInfo from "@c/Reservation/ReservationGuestInfo";
import ReservationDate from "@c/Reservation/ReservationDate";
import PlaceInfo from "@c/Reservation/PlaceInfo";
import ScrollToTop from "@c/ScrollTop";
import PopUpModal from "@c/PopUpModal";
import Button from "@c/Button";
import MetaData from "@c/MetaData";

function ReservationWrite() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { reservationData, resetReservationData } = useReservation();

  const isValid = (reservationData) => {
    for (const key in reservationData) {
      if (key === "canceled" || key === "visited" || key === "requirements") break;

      const value = reservationData[key];

      if (!value && value !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    switch (true) {
      case !isValid(reservationData):
        alertMessage("필수사항을 입력해주세요.", "❗");
        return;

      case !isTelRegValid(reservationData.tel):
        alertMessage("전화번호 정보가 올바르지 않습니다.", "❗");
        return;

      case !isEmailRegValid(reservationData.email):
        alertMessage("이메일 정보가 올바르지 않습니다.", "❗");
        return;

      case isBefore(reservationData.date, new Date()): // 현재 시간보다 이전 시간 선택 시 알림
        alertMessage("지난 시간입니다. 시간을 확인해주세요.", "❗");
        return;
    }

    try {
      await pb.collection("reservation").create(reservationData);
      alertMessage("예약이 등록되었습니다.");
      resetReservationData();
      navigate("/reservation");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.", "❗");
      console.error("데이터 전송 실패:", error);
    }
  };

  const handleGoBack = () => {
    resetReservationData();
    navigate(-1);
  };

  const metaData = {
    title: "Best Place - 예약작성",
    description: "식당예약 작성 페이지",
    keywords: ["예약", "식당예약", "예약시간"],
    image: "/public/logo.svg",
  };

  return (
    <>
      <MetaData props={metaData} />
      <ScrollToTop />
      <PopUpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="정말 취소하시겠습니까?"
        actionTitle="확인"
        handleEvent={handleGoBack}
      />

      <Header />
      <main className="mx-auto mb-10 max-w-3xl px-3">
        <button onClick={() => setOpenModal(true)} className="float-right">
          <GoX className="mr-1 text-2xl" />
        </button>
        <section className="mx-auto my-8 mt-4 max-w-3xl flex-wrap gap-4">
          <h2 className="hidden">가게정보</h2>
          <PlaceInfo />
        </section>
        <section>
          <h2 className="mb-4 text-center text-lg font-semibold">예약정보를 입력하세요</h2>
          <form method="POST" className="flex flex-col">
            <ReservationDate />
            <ReservationGuestCount />
            <ReservationGuestInfo />
            <div className="sticky bottom-0 z-10 flex gap-2 bg-gradient-to-b from-white/10 from-10% to-white to-40% pb-3 pt-8">
              <Button
                text="취소하기"
                onClick={() => setOpenModal(true)}
                bgColor="bg-gray-100"
                textColor="text-red-500"
              />
              <Button type="submit" text="등록하기" onClick={handleSubmit} />
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default ReservationWrite;
