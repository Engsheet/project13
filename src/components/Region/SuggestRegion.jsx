import { suggestRegionList } from "@/data/regions";
import { array, func, object } from "prop-types";

//@ '이런 지역 어때요' 리스트
function SuggestRegion({ ...props }) {
  const nickname = props.userData?.nickname;
  const checkedRegionList = props.checkedRegionList;

  const handleUpdateRegion = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(
      !checkedRegionList.find((i) => i === regionName)
        ? [...checkedRegionList, regionName]
        : checkedRegionList.filter((i) => i !== regionName)
    );
  };

  return (
    <div>
      <h3 className="text-lg font-bold">이런 지역 어때요?</h3>
      <p className="my-2 mb-4">
        <span className="font-extrabold text-secondary decoration-secondary hover:underline">{nickname}</span>&nbsp;님이
        좋아하실 것 같아요
      </p>
      <ul className="grid grid-cols-2 gap-3">
        {suggestRegionList.map((region, index) => (
          <li
            key={index}
            className={`group relative rounded-lg rounded-xl ${
              !checkedRegionList.includes(region.name)
                ? "bg-neutral-100 hover:bg-opacity-80 hover:shadow-md"
                : "bg-sky-100 shadow-md hover:bg-opacity-50"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"suggest " + region.name} className="block cursor-pointer p-4">
              <p
                className={`text-xs text-gray-500 ${
                  !checkedRegionList.includes(region.name) ? "font-semibold " : "font-bold"
                }`}
              >
                {region.tag}
              </p>
              <h4 className={`${!checkedRegionList.includes(region.name) ? "font-bold " : "font-extrabold"}`}>
                {region.name}
              </h4>
              <span
                className={`absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 ${
                  !checkedRegionList.includes(region.name)
                    ? "group-hover:bg-check-hover bg-check"
                    : "group-hover:bg-checked-hover bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"suggest " + region.name} onChange={handleUpdateRegion} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

SuggestRegion.propTypes = {
  checkedRegionList: array,
  userData: object,
  onUpdate: func,
};

export default SuggestRegion;
