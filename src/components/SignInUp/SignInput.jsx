import { string, func } from "prop-types";
import { useState } from "react";

function SignInput({
  labelValue,
  ariaText,
  placeHolder,
  inputValue,
  type = "text",
}) {
  const [inputChange, setInputChange] = useState("");

  const handleChangeInput = ({ target }) => {
    setInputChange(target.value);
    inputValue(target.value);
  };

  return (
    <div className="text-sm sm:text-base">
      <label className="pl-1 font-bold text-secondary" htmlFor="signInputId">
        {labelValue}
      </label>
      <input
        id="signInputId"
        className="w-full rounded border px-3 py-2 my-0.5 placeholder-transparent caret-secondary outline-none focus:border-primary sm:py-2"
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
