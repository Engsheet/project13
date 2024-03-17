import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { array, object } from "prop-types";
import { useState } from "react";
import { MdOutlineCheck } from "react-icons/md";

//@ 예약 횟수 컴포넌트
function ReservationCount({ userInfo, visitedList }) {
  const [onFocus, setOnFocus] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);

  let visitCount = visitedList.reduce((acc, cur) => {
    acc[cur.expand.place.title] = (acc[cur.expand.place.title] || 0) + 1;
    return acc;
  }, {});
  let visitData = Object.entries(visitCount).sort((a, b) => b[1] - a[1]);
  let renderList = !isSeeMore ? visitData.slice(0, 3) : visitData.slice(0, 8);
  let firstCount = renderList.length !== 0 ? renderList[0][1] : 0;

  function handleClickButton() {
    setIsSeeMore(!isSeeMore);
  }

  return (
    <div className="mt-8 border-b border-dashed border-gray-500/50 pb-8">
      <h3 className="mb-6 text-lg font-bold">
        <MdOutlineCheck className="mr-2 inline text-3xl" />
        <p className="inline align-bottom">
          <span className="text-secondary decoration-secondary hover:underline">{userInfo.nickname}</span>
          &nbsp;님은 LION PLACE로&nbsp;
          <span className="text-secondary decoration-secondary hover:underline">{visitedList.length}회</span>
          &nbsp;예약하고 방문했어요
        </p>
      </h3>

      <ol>
        {renderList.map((item, index) => (
          <li key={index} className="mb-6">
            <div className="flex items-center justify-between">
              <span className="mr-2 w-6 items-center rounded-lg border-2 bg-black text-center text-sm font-bold text-white">
                {index + 1}
              </span>
              <h4 className="grow font-semibold">{item[0]}</h4>
              <p className="mr-1 font-bold">{item[1]}회</p>
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
          renderList.length < 3 ? "hidden" : ""
        }`}
      >
        <input
          type="checkbox"
          className="sr-only"
          onChange={handleClickButton}
          id="seeMoreButton"
          tabIndex={0}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
        <p
          className={`flex items-center rounded-md border-2 px-1.5 hover:font-bold ${
            onFocus ? "border-black font-bold" : "border-transparent"
          }`}
        >
          <span>{!isSeeMore ? "더보기" : "접기"}&nbsp;</span>
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
