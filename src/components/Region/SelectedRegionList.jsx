import { array, func } from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { GoX } from "react-icons/go";

//@ 내 관심지역
function SelectedRegionList({ ...props }) {
  const checkedRegionList = props.checkedRegionList;

  const handleRemoveButton = (e) => {
    let regionName = e.target.closest("li").querySelector("h4").innerText;

    props.onUpdate(checkedRegionList.filter((i) => i !== regionName));
  };

  return (
    <div>
      <div className="mb-4 flex items-end justify-center">
        <h3 className="grow text-lg font-bold">
          내 관심지역 <span className="text-primary">{checkedRegionList.length}</span>
        </h3>
        <button
          type="button"
          className="text-sm font-semibold text-gray-700 hover:text-primary"
          onClick={props.onRemove}
        >
          전체 삭제
        </button>
      </div>

      <ul>
        {checkedRegionList.map((region, index) => (
          <li key={index} className="my-1 flex items-center justify-between rounded-lg border border-primary px-4 py-2">
            <FaLocationArrow className="mr-2 inline-block text-primary" />
            <h4 className="grow text-base font-bold">{region}</h4>
            <button type="button" onClick={handleRemoveButton} aria-label="항목 삭제" className="group">
              <GoX className="text-xl hover:text-primary group-focus:text-primary" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

SelectedRegionList.propTypes = {
  checkedRegionList: array,
  onUpdate: func,
  onRemove: func,
};

export default SelectedRegionList;
