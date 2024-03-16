import { popularRegionList } from "@/data/regions";
import { array, func } from "prop-types";

//@ '요즘 많이 찾아봐요' 리스트
function PopularRegion({ ...props }) {
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
      <h3 className="mb-4 text-lg font-bold">요즘 많이 찾아봐요</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {popularRegionList.map((region, index) => (
          <li
            key={index}
            className={`relative rounded-lg ${
              !checkedRegionList.includes(region.name) ? "bg-neutral-100" : "bg-sky-100 shadow-md"
            }`}
            aria-label={region.name + "를 관심 지역에 추가"}
          >
            <label htmlFor={"popular " + region.name} className="block flex cursor-pointer flex-col items-center p-4">
              {/* 사진 div */}
              <img src={region.image} alt="" className="h-12 w-12 rounded-full" />
              <h4
                className={`mx-auto text-sm ${
                  !checkedRegionList.includes(region.name) ? "font-semibold " : "font-bold"
                }`}
              >
                {region.name}
              </h4>
              <span
                className={`absolute right-2 top-0 h-[18px] w-[18px] translate-y-1/2 ${
                  !checkedRegionList.includes(region.name) ? "bg-check" : "bg-checked"
                }`}
              ></span>
              <input type="checkbox" className="sr-only" id={"popular " + region.name} onChange={handleUpdateRegion} />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

PopularRegion.propTypes = {
  checkedRegionList: array,
  onUpdate: func,
};

export default PopularRegion;
