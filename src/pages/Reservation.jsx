import { pb } from "@/api/pocketbase";
import Spinner from "@/components/Spinner";
import SwiperCategory from "@/components/SwiperCategory";
import useFetchAllReviews from "@/hooks/useFetchWriteReview";
import useReservationList, { useFetchVisitData } from "@/hooks/useReservationList.js";
import { dateFormat, timeFormat } from "@/utils";
import { array, string } from "prop-types";
import { useState } from "react";
import { BsCalendarWeek, BsChevronDown, BsChevronUp, BsPencilFill } from "react-icons/bs";
import { GoStar } from "react-icons/go";
import { MdFoodBank, MdMoreVert, MdOutlineCheck } from "react-icons/md";
import { PiCalendarCheckBold, PiCalendarXBold } from "react-icons/pi";
import { calcDay } from "./../utils/getDate";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */

//@ 현재 예약중 리스트
function ReservedList({ reservedList, nickname }) {
  return (
    <div className="border-b border-dashed border-gray-500/50 pb-6">
      <h3 className="mb-4 mt-2 text-lg font-bold">
        <BsCalendarWeek className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{nickname}</span>님이 현재 예약한 정보에요
      </h3>

      <ul>
        {reservedList.map((item, index) => (
          <li key={index} className="my-2 rounded-2xl border-2 border-primary p-4">
            <p className="inline rounded-xl bg-primary px-1.5 py-0.5 text-xs font-bold text-white">
              {calcDay(item.date)}
            </p>
            <h4 className="mt-1 font-bold">{item.expand.place.title}</h4>
            <p className="text-sm font-light">
              {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span>
              {timeFormat(item.date)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReservedList.propTypes = {
  reservedList: array,
  nickname: string
};

/* -------------------------------------------------------------------------- */

//@ 예약 횟수 컴포넌트
function ReservationCount({ nickname, visitedList }) {
  const { data: visitData } = useFetchVisitData();
  const [isSeeMore, setIsSeeMore] = useState(false);
  let renderList = !isSeeMore ? visitData?.slice(0, 3) : visitData?.slice(0, 9);

  function handleClickButton() {
    setIsSeeMore(!isSeeMore);
  }

  return (
    <div className="my-12">
      <h3 className="my-5 text-lg font-bold">
        <MdOutlineCheck className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{nickname}</span>님은 LION PLACE로
        <span className="text-secondary"> {visitedList?.length}회 </span>
        예약했어요
      </h3>

      <ol>
        {renderList?.map((item, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-center justify-between">
              <span className="mr-2 w-6 items-center rounded-lg border-2 bg-black text-center text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="grow font-semibold">{item[0]}</h4>
              <p className="font-bold">{item[1]}회</p>
            </div>
            <div className="mt-2 h-1 w-full rounded-md bg-gray-200">
              <div className={`h-1 w-[50%] rounded-md bg-primary`} />
              {/* ${Math.floor((2 / filterList?.length) * 100)} */}
            </div>
          </li>
        ))}
      </ol>

      <label
        htmlFor="seeMoreButton"
        className={`mx-auto my-5 flex cursor-pointer items-center justify-center gap-1 ${
          renderList?.length < 3 ? "hidden" : ""
        }`}
      >
        <input type="checkbox" className="sr-only" onChange={handleClickButton} id="seeMoreButton" />
        <span>{!isSeeMore ? "더보기" : "접기"}</span>
        {!isSeeMore ? <BsChevronDown /> : <BsChevronUp />}
      </label>
    </div>
  );
}

ReservationCount.propTypes = {
  nickname: string,
  visitedList: array,
};

/* -------------------------------------------------------------------------- */

//@ 예약 리스트
function ReservationList({ userId, progressList, visitedList, canceledList }) {
  const { data: visitData } = useFetchVisitData();
  const { data: writeReview } = useFetchAllReviews();
  let renderList = progressList;
  const [filter, setFilter] = useState("all");
  const [isHoverMenu, setIsHoverMenu] = useState(false);

  function onChangeRadio(e) {
    setFilter(e.target.value);
  }

  function onHoverButton(e) {
    setIsHoverMenu(true);
  }

  switch (filter) {
    case "visit":
      renderList = visitedList;
      break;
    case "cancel":
      renderList = canceledList;
      break;
    case "date":
      renderList = visitedList;
      break;
    default:
      renderList = progressList;
  }

  function ReservationVisitIcon() {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
        <PiCalendarCheckBold className="text-3xl text-white" />
      </div>
    );
  }

  // 예약취소 아이콘
  function ReservationCancelIcon() {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500">
        <PiCalendarXBold className="text-3xl text-white" />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <label
          htmlFor="filterAllButton"
          className={`rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
            filter === "all" ? `border-0 bg-primary text-white shadow-md` : `border text-gray-600 shadow-md`
          }`}
        >
          <input
            type="radio"
            name="filter"
            value="all"
            id="filterAllButton"
            onChange={onChangeRadio}
            className="sr-only"
          />
          <p>전체</p>
        </label>
        <label
          htmlFor="filterVisitButton"
          className={`rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
            filter === "visit" ? `border-0 bg-primary text-white shadow-md` : `border text-gray-600 shadow-md`
          }`}
        >
          <input
            type="radio"
            name="filter"
            id="filterVisitButton"
            value="visit"
            onChange={onChangeRadio}
            className="sr-only"
          />
          <p>
            방문 <span className="pl-0.5 font-medium">{visitedList.length}</span>
          </p>
        </label>
        <label
          htmlFor="filterCancelButton"
          className={`rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
            filter === "cancel" ? `border-0 bg-primary text-white shadow-md` : `border text-gray-600 shadow-md`
          }`}
        >
          <input
            type="radio"
            name="filter"
            id="filterCancelButton"
            value="cancel"
            onChange={onChangeRadio}
            className="sr-only"
          />
          <p>
            예약 취소 <span className="pl-0.5">{canceledList.length}</span>
          </p>
        </label>

        {/* <label
          htmlFor="filterDateButton"
          className={`rounded-xl border border-gray-200/50 px-4 py-2 text-sm ${
            filter === "date"
              ? `border-0 bg-primary text-white shadow-md`
              : `border text-gray-600 shadow-md`
          }`}
        >
          <input type="radio" name="filter" id="filterDateButton" value="date" onChange={onChangeRadio} />
          <p className="flex items-center">
            기간 선택
            <BsCalendarWeek className="ml-2 text-primary" />
          </p>
        </label> */}
      </div>

      <ul>
        {renderList.map((item, index) => (
          <li key={index} className="my-8">
            <div className="flex items-center gap-2">
              {!item.canceled ? <ReservationVisitIcon /> : <ReservationCancelIcon />}
              <div className="grow">
                <h4 className="font-bold">{item.expand.place.title}</h4>
                <p className="text-sm font-light">
                  {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span> {timeFormat(item.date)}
                </p>
              </div>
              <div className="flex gap-2 text-lg">
                <button type="button">
                  <MdMoreVert />
                </button>
                {/* // TODO LINK 연동 필요 */}
                <Link to={"/reservation-write"} state={{
                  userId: userId,
                  placeId: item.expand.place.id,
                  title: item.expand.place.title,
                  category: item.expand.place.category,
                  address: item.expand.place.address
                }}>
                  <p className="text-sm font-semibold">
                    <span className="text-primary">+ </span>재예약
                  </p>
                </Link>
              </div>
            </div>

            <div className="my-2 w-full rounded-2xl border border-gray-200/50 px-4 shadow-md">
              <div className="flex- flex justify-center border-b border-dashed pb-3 pt-4">
                <p className={`grow ${!item.canceled ? "font-semibold" : "font-semibold text-gray-500"}`}>
                  {!item.canceled ? "방문 완료" : "예약 취소"}
                </p>
                <Link to={"/review-write"} state={{
                    userId: userId,
                    placeId: item.expand.place.id,
                    title: item.expand.place.title,
                    category: item.expand.place.category,
                    address: item.expand.place.address
                }}>
                <p
                  className={
                    !item.canceled && !writeReview?.includes(item.id)
                      ? "mr-2 flex items-center text-sm font-semibold text-gray-700"
                      : "hidden"
                  }
                >
                  <BsPencilFill className="mr-1 inline text-primary" /> 리뷰 작성하기
                </p>
                </Link>    
                <p
                  className={
                    !item.canceled && writeReview?.includes(item.id)
                      ? "mr-2 flex items-center text-sm font-medium text-gray-700"
                      : "hidden"
                  }
                >
                  <MdOutlineCheck className="mr-1 inline text-lg text-primary" />
                  리뷰 등록됨
                </p>
              </div>
              <div className="pb-4 pt-3">
                <dt className="sr-only">주소</dt>
                <dd className="font-semibold">{item.expand.place.address}</dd>
                <dt className="sr-only">카테고리</dt>
                <dd className="font-semibold text-gray-600">{item.expand.place.category}</dd>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="mx-auto my-5 flex items-center gap-1 rounded-3xl border border-gray-200 px-4 py-2 text-sm shadow-sm"
      >
        <span>내역 더보기</span> <BsChevronDown />
      </button>
    </>
  );
}

ReservationList.propTypes = {
  userId: string,
  progressList: array,
  visitedList: array,
  canceledList: array,
};

/* -------------------------------------------------------------------------- */

//@ 예약 페이지 컴포넌트
function Reservation() {
  let userId = pb.authStore.model.id;
  let nickname = pb.authStore.model.nickname;
  const { data: reservation, isLoading } = useReservationList();
  let reservedList = [];
  let progressList = [];
  let visitedList = [];
  let canceledList = [];

  reservation?.forEach((item) => {
    !item.canceled && !item.visited
      ? (reservedList = [...reservedList, item])
      : (progressList = [...progressList, item]);
  });

  progressList.forEach((item) => {
    !item.canceled ? (visitedList = [...visitedList, item]) : (canceledList = [...canceledList, item]);
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      {/* 현재 예약중 리스트 */}
      <ReservedList nickname={nickname} reservedList={reservedList.reverse()} />
      {/* 카테고리 선택 */}
      <div className="my-6">
        <h3 className="mb-2 text-lg font-bold">
          <MdFoodBank className="mr-2 inline align-bottom text-3xl" />
          카테고리를 선택하세요
        </h3>
        <SwiperCategory />
      </div>

      {/* 예약 횟수 */}
      <ReservationCount nickname={nickname} visitedList={visitedList} />

      {/* 예약 리스트 */}
      <ReservationList userId={userId} progressList={progressList} visitedList={visitedList} canceledList={canceledList} />
    </div>
  );
}

export default Reservation;
