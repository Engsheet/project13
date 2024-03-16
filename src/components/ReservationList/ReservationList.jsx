import { useInfiniteList, useIntersect } from '@/hooks';
import useFetchAllReviews from '@/hooks/useFetchWriteReview';
import { dateFormat, timeFormat } from '@/utils';
import { Dropdown } from 'flowbite-react';
import { array, object } from 'prop-types';
import { useState } from 'react';
import { BsPencilFill } from 'react-icons/bs';
import { MdMoreVert, MdOutlineCheck } from 'react-icons/md';
import { PiCalendarCheckBold, PiCalendarXBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

//@ 예약 리스트
function ReservationList({ userInfo, visitedList, canceledList }) {
  let renderList;
  let userId = userInfo.id;
  const { data: writeReview } = useFetchAllReviews();
  const [filter, setFilter] = useState("all");

  const {
    data: infiniteRenderList,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteList("reservation", {
    filter: `booker="${userInfo.id}" && (visited=true || canceled=true)`,
    sort: "-date",
  });

  let infiniteList = infiniteRenderList?.flatMap((list) => list.items).filter((i) => i.canceled || i.visited) || null;

  switch (filter) {
    case "visit":
      renderList = infiniteList.filter((i) => i.visited) || null;
      break;
    case "cancel":
      renderList = infiniteList.filter((i) => i.canceled) || null;
      break;
    default:
      renderList = infiniteList;
  }

  // 인피니트 스크롤
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  function onChangeRadio(e) {
    setFilter(e.target.value);
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
          className={`cursor-pointer rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
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
          className={`cursor-pointer rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
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
          className={`cursor-pointer rounded-xl border border-gray-200/50 px-4 py-2 text-sm font-semibold ${
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
      </div>

      <ul className="mb-8">
        {renderList?.map((item, index) => (
          <li key={index} className="my-8">
            <div className="flex items-center gap-2">
              {!item.canceled ? <ReservationVisitIcon /> : <ReservationCancelIcon />}
              <div className="grow">
                <h4 className="font-bold">{item.expand.place.title}</h4>
                <p className="text-sm font-light">
                  {dateFormat(item.date)} <span className="mx-1 font-normal opacity-40">|</span> {timeFormat(item.date)}
                </p>
              </div>
              <div className="flex gap-2 text-lg mr-1">
                <Dropdown inline arrowIcon={null} label={<MdMoreVert />} style={null}>
                  <Link to={"/reservation-write"} state={{ userInfo, item }}>
                    <p className="mx-3 my-1 bg-transparent text-center  text-sm font-semibold">+ 재예약</p>
                  </Link>
                </Dropdown>
              </div>
            </div>

            <div className="my-2 w-full rounded-2xl border border-gray-200/50 px-4 shadow-md">
              <div className="flex- flex justify-center border-b border-dashed pb-3 pt-4">
                <p className={`grow ${!item.canceled ? "font-semibold" : "font-semibold text-gray-500"}`}>
                  {!item.canceled ? "방문 완료" : "예약 취소"}
                </p>
                <Link to={"/review-write"} state={{ userId, item }}>
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

      {/* 인피니티 스크롤시 필요한 요소 */}
      <div ref={ref} className="h-[1px]"></div>
    </>
  );
}

ReservationList.propTypes = {
  userInfo: object,
  progressList: array,
  visitedList: array,
  canceledList: array,
};

export default ReservationList;