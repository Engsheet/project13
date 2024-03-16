import { string, func } from "prop-types";
import { useState } from "react";

function SignInput({
  labelValue,
  ariaText,
  placeHolder,
  inputValue,
  bgColor = "bg-primary",
  textColor = "text-white",
  placeHolderColor = "placeholder-white",
  type = "text",
}) {
  const [inputChange, setInputChange] = useState("");

  const handleChangeInput = ({ target }) => {
    setInputChange(target.value);
    inputValue(target.value);
  };

  return (
    <div className="">
      <label className="" htmlFor="signInputId">
        {labelValue}
      </label>
      <input
        id="signInputId"
        className={`${textColor} ${bgColor} ${placeHolderColor} my-2 w-full rounded border px-7 py-4 text-base`}
        type={type}
        aria-label={ariaText}
        placeholder={placeHolder}
        value={inputChange}
        onChange={handleChangeInput}
      />
    </div>
  );
}
SignInput.propTypes = {
  labelValue: string,
  ariaText: string,
  placeHolder: string,
  inputValue: func,
  bgColor: string,
  textColor: string,
  placeHolderColor: string,
  type: string,
};

export default SignInput;
