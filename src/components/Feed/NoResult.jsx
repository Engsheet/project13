import { string } from "prop-types";
import { MdOutlineSearchOff } from "react-icons/md";

function NoResult({ title, contents }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-10">
      <img src="/search-guide.png" alt="현재 화면에 표시되는 정보가 없습니다." className="mb-2" />
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <p className="mt-2">{contents}</p>
    </div>
  );
}

NoResult.propTypes = {
  title: string,
  contents: string,
};

export default NoResult;
