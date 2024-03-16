import { pb } from "@/api/pocketbase";
import { GoX } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import VisitedPlaceInfo from "@c/Review/VisitedPlaceInfo";
import ReviewKeyword from "@c/Review/ReviewKeyword";
import ReviewPhoto from "@c/Review/ReviewPhoto";
import ScrollToTop from "@c/ScrollTop";
import PopUpModal from "@c/PopUpModal";
import WriteText from "@c/WriteText";
import Button from "@c/Button";
import { alertMessage } from "@u/index";
import useReview from "@h/useReview";
import Header from "@l/Header";
import { useState } from "react";
import MetaData from "@c/MetaData";

function ReviewWrite() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const { handleInputChange, reviewData, resetReviewData } = useReview();

  const isValid = (reviewData) => {
    for (const key in reviewData) {
      if (key === "canceled" || key === "visited") break;
      const value = reviewData[key];
      if (!value && value !== 0) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid(reviewData)) {
      alertMessage("공란이 있습니다.", "❗");
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(reviewData)) {
      if (key === "photos" || key === "keywords") {
        for (let item of value) {
          formData.append(key, item);
        }
      } else {
        formData.append(key, value);
      }
    }

    try {
      await pb.collection("reviews").create(formData);
      alertMessage("리뷰가 등록되었습니다.");
      resetReviewData();
      navigate("/reservation");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.", "❗");
    }
  };

  const handleGoBack = () => {
    resetReviewData();
    navigate(-1);
  };
  const metaData = {
    title: "Best Place - 리뷰작성",
    description: "예약에 대한 리뷰 작성",
    keywords: ["리뷰", "기록", "후기", "맛집기행"],
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
      <main className="relative mx-auto mb-10 max-w-3xl px-3">
        <button onClick={() => setOpenModal(true)} className="absolute right-2">
          <GoX className="text-2xl" />
        </button>
        <form method="POST" className="mx-auto mt-4 flex flex-col flex-wrap gap-4">
          <VisitedPlaceInfo />
          <WriteText
            label="리뷰를 남겨주세요"
            placeholder="업주와 다른 사용자들이 상처받지 않도록 좋은 표현을 사용해주세요. 유용한 Tip도 남겨주세요!"
            name="contents"
            value={reviewData.contents}
            onChange={handleInputChange}
          />
          <ReviewPhoto name="photos" />
          <ReviewKeyword name="keywords" />
          <div className="sticky bottom-0 z-10 flex gap-2 bg-gradient-to-b from-white/10 from-10% to-white to-40% pb-3 pt-8">
            <Button text="취소하기" onClick={() => setOpenModal(true)} bgColor="bg-gray-100" textColor="text-red-500" />
            <Button type="submit" text="등록하기" onClick={handleSubmit} />
            {/* isValid={!isValid(reviewData)} */}
          </div>
        </form>
      </main>
    </>
  );
}

export default ReviewWrite;
