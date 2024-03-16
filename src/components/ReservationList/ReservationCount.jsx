import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { array, object } from "prop-types";
import { useFetchVisitData } from "@/hooks/useReservationList";
import { useState } from "react";
import { MdOutlineCheck } from "react-icons/md";

//@ 예약 횟수 컴포넌트
function ReservationCount({ userInfo, visitedList }) {
  const [onFocus, setOnFocus] = useState(false);
  const { data: visitData } = useFetchVisitData();
  const [isSeeMore, setIsSeeMore] = useState(false);

  if (!visitData) return;

  let renderList = !isSeeMore ? visitData?.slice(0, 3) : visitData?.slice(0, 9);
  let firstCount = renderList.length !== 0 ? renderList[0][1] : 0;

  function handleClickButton() {
    setIsSeeMore(!isSeeMore);
  }

  function handleFocusButton() {
    setOnFocus(!onFocus);
  }

  return (
    <div className="my-8 border-b border-dashed border-gray-500/50 pb-8">
      <h3 className="mb-6 text-lg font-bold">
        <MdOutlineCheck className="mr-2 inline align-bottom text-3xl" />
        <span className="mx-0.5 text-secondary">{userInfo.nickname}</span>님은 LION PLACE로
        <span className="text-secondary"> {visitedList?.length}회 </span>
        예약하고 방문했어요
      </h3>

      <ol>
        {renderList?.map((item, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-center justify-between">
              <span className="mr-2 w-6 items-center rounded-lg border-2 bg-black text-center text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="grow font-semibold">{item[0]}</h4>
              <p className="font-bold mr-1">{item[1]}회</p>
            </div>
            <div className="mt-2 h-0.5 w-full rounded-md bg-gray-200">
              <div
                className={`h-0.5 rounded-md bg-primary`}
                style={{ width: `${Math.floor((item[1] / firstCount) * 100)}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ol>

      <label
        htmlFor="seeMoreButton"
        className={`mx-auto flex cursor-pointer items-center justify-center gap-1 ${
          renderList?.length < 3 ? "hidden" : ""
        }`}
      >
        <input
          type="checkbox"
          className="sr-only"
          onChange={handleClickButton}
          id="seeMoreButton"
          tabIndex={0}
          onFocus={handleFocusButton}
          onBlur={handleFocusButton}
        />
        <p className={onFocus ? "border-2 border-black rounded-md px-1" : "py-0.5"}>
          <span>{!isSeeMore ? "더보기" : "접기"}</span>
          {!isSeeMore ? <BsChevronDown className="inline" /> : <BsChevronUp className="inline" />}
        </p>
      </label>
    </div>
  );
}

ReservationCount.propTypes = {
  userInfo: object,
  visitedList: array,
};

export default ReservationCount;
