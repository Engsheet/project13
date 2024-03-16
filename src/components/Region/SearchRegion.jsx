import { locations } from "@/data/regions";
import debounce from "@/utils/debounce";
import { array, bool, func } from "prop-types";
import { useState } from "react";
import { useRef } from "react";
import { FaLocationArrow, FaSearch } from "react-icons/fa";
import { GoChevronLeft, GoX } from "react-icons/go";

//@ 검색창 기능
function SearchRegion({ ...props }) {
  const checkedRegionList = props.checkedRegionList;
  const isFocusSearchBar = props.isFocusSearchBar;
  const inputRef = useRef("");
  const [isSearch, setIsSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const toggleInputSearch = () => {
    if (inputRef.current.value) {
      setIsSearch(true);
      setSearchResult(locations.filter((region) => region.includes(inputRef.current.value)));
    } else {
      setIsSearch(false);
      setSearchResult([]);
    }
  };

  // 검색 결과 초기화
  function resetSearchState() {
    inputRef.current.value = "";
    setIsSearch(false);
    setSearchResult([]);
  }

  // 텍스트 삭제 버튼 클릭 이벤트
  const handleClickRemoveText = () => {
    resetSearchState();
  };

  // 페이지 뒤로가기 버튼 클릭 이벤트
  const handleClickPageBack = () => {
    props.onFocus(false);
    resetSearchState();
  };

  // 검색 창에서 리전 추가
  const handleUpdateRegion = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(
      !checkedRegionList.find((i) => i === regionName)
        ? [...checkedRegionList, regionName]
        : checkedRegionList.filter((i) => i !== regionName)
    );

    props.onFocus(false);
    resetSearchState();
  };

  // 검색창 포커스 시 이벤트
  const handleFocusSearchBar = () => {
    if (isFocusSearchBar === false) props.onFocus(true);
  };

  return (
    <>
      <div className="flex items-center gap-1 mt-3">
        {!isFocusSearchBar || (
          <button type="button" onClick={handleClickPageBack} className="ml-1 px-1 text-4xl" aria-label="뒤로 가기">
            <GoChevronLeft />
          </button>
        )}
        <div
          className={`flex grow items-center justify-between gap-2 rounded-xl border border-black px-4 py-3 focus:outline-none ${
            !isFocusSearchBar || "border-2"
          }`}
        >
          <label htmlFor="searchRegion">
            <FaSearch />
          </label>
          <input
            type="text"
            id="searchRegion"
            placeholder="원하는 지역을 검색해 보세요"
            className="grow appearance-none text-base focus:outline-none"
            onFocus={handleFocusSearchBar}
            onChange={debounce((e) => toggleInputSearch(e.target.value), 500)}
            ref={inputRef}
            role="searchbox"
          />
          {!isFocusSearchBar || (
            <button type="button" onClick={handleClickRemoveText} aria-label="텍스트 삭제하기">
              <GoX className="text-2xl" />
            </button>
          )}
        </div>
      </div>
      <div className={`mt-28 flex flex-col items-center ${!isSearch || "hidden"} ${isFocusSearchBar || "hidden"}`}>
        <img src="/search-guide.png" alt="현재 화면에 표시되는 정보가 없습니다." className="mb-2" />
        <p className="text-lg font-bold">지역명을 검색해서</p>
        <p className="text-lg font-bold">관심지역으로 설정할 수 있어요!</p>
        <p className="mt-2 text-sm font-semibold text-gray-500">예) 서울, 해운대구, 경주시 등</p>
      </div>
      <div className="mt-4">
        {searchResult.toSorted().map(
          (region, index) =>
            !isSearch || (
              <li key={index} className="mt-2 flex items-center justify-between gap-2 rounded-lg px-4 py-2 text-lg">
                <FaLocationArrow className="mr-2 inline-block text-primary" />
                <div className="flex grow items-center justify-start">
                  <h4 className="font-bold">{region}</h4>
                  {!checkedRegionList.includes(region) || (
                    <span className="mx-2 rounded-lg bg-gray-600 p-1 text-xs text-white">내 관심지역</span>
                  )}
                </div>
                <button
                  type="button"
                  className={`h-5 w-5 bg-contain ${!checkedRegionList.includes(region) ? "bg-check" : "bg-checked"}`}
                  onClick={handleUpdateRegion}
                ></button>
              </li>
            )
        )}
      </div>
    </>
  );
}

SearchRegion.propTypes = {
  checkedRegionList: array,
  isFocusSearchBar: bool,
  onFocus: func,
  onUpdate: func,
};

export default SearchRegion;
