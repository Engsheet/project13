import { func } from "prop-types";

//@ 저장 버튼 컴포넌트
function RegionSaveButton({ onClick }) {
  return (
    <div className="sticky bottom-0 z-10 bg-gradient-to-b from-white/10 from-10% to-white to-40% pb-3 pt-8">
      <button
        type="button"
        className="w-full rounded-lg bg-primary py-3 font-bold text-white hover:bg-opacity-80 focus:bg-opacity-80"
        onClick={onClick}
      >
        이대로 저장할래요
      </button>
    </div>
  );
}

RegionSaveButton.propTypes = {
  onClick: func,
};

export default RegionSaveButton;
