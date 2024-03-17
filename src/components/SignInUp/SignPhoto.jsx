import { string, func } from "prop-types";
import { useState, useRef } from "react";
import { pb } from "@/api/pocketbase";
import { getPbImageURL } from "./../../utils/getPbImageURL";

function SignInput({ labelValue, inputValue }) {
  const [inputChange] = useState();
  const [fileUrl, setFileUrl] = useState(
    pb.authStore.model.avatar ? getPbImageURL(pb.authStore.model, pb.authStore.model.avatar) : "/button-check.svg"
  );
  const [onFocus, setOnFocus] = useState(false);

  const handleChangeInput = ({ target }) => {
    const selectedFile = target.files[0];
    const url = URL.createObjectURL(selectedFile);
    setFileUrl(url);
    inputValue(selectedFile);
  };
  const inputFileRef = useRef(); // Create a ref

  const handleClickImage = () => {
    inputFileRef.current.click(); // Simulate click on input when image is clicked
  };

  return (
    <>
      <div className="mb-4 mt-6 flex flex-col items-center">
        <img
          className={`h-32 w-32 cursor-pointer rounded-full border-4 shadow-[0_1px_6px_rgba(0,0,0,0.1)] hover:border-primary ${
            !onFocus || "border-primary"
          }`}
          src={fileUrl}
          alt="프로필 사진"
          onClick={handleClickImage}
        />

        <label className="sr-only" htmlFor={labelValue}>
          {labelValue}
        </label>
        <input
          ref={inputFileRef}
          type="file"
          accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
          onChange={handleChangeInput}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          value={inputChange}
          id={labelValue}
          className="sr-only w-full cursor-pointer rounded px-7 py-4 text-base"
        ></input>
      </div>
    </>
  );
}
SignInput.propTypes = {
  labelValue: string,
  inputValue: func,
};

export default SignInput;
