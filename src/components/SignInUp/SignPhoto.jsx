import { string, func } from "prop-types";
import { useState, useRef } from "react";
import { pb } from "@/api/pocketbase";
import { getPbImageURL } from "./../../utils/getPbImageURL";

function SignPhoto({
  labelValue,
  ariaText,
  placeHolder,
  inputValue,
  bgColor = "bg-primary",
  textColor = "text-white",
  placeHolderColor = "placeholder-white",
}) {
  const [inputChange] = useState();
  const [fileUrl, setFileUrl] = useState(
    pb.authStore.model.avatar ? getPbImageURL(pb.authStore.model, pb.authStore.model.avatar) : "/button-check.svg"
  );

  const handleChangeInput = ({ target }) => {
    // setInputChange(target.value);
    // inputValue(target.value);
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
      <label className="" htmlFor="signInputId">
        {labelValue}
      </label>

      <div className="flex flex-col items-center">
        <img
          className="mx-5 mt-3 h-[120px] w-[120px] cursor-pointer rounded-full  border-4 border-primary"
          src={fileUrl}
          alt="프로필 사진"
          onClick={handleClickImage}
        />

        <input
          ref={inputFileRef}
          type="file"
          accept="*.jpg,*.png,*.jpeg,*.webp,*.avif"
          onChange={handleChangeInput}
          value={inputChange}
          id="signInputId"
          className={`hidden ${textColor} ${bgColor} ${placeHolderColor} w-full cursor-pointer rounded px-7 py-4 text-base`}
          aria-label={ariaText}
          placeholder={placeHolder}
        />
      </div>
    </>
  );
}
SignPhoto.propTypes = {
  labelValue: string,
  ariaText: string,
  placeHolder: string,
  inputValue: func,
  bgColor: string,
  textColor: string,
  placeHolderColor: string,
};

export default SignPhoto;
