import { string, func } from "prop-types";
import { useState } from "react";

function SignInput({
  labelValue,
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
      <label className="pl-1 font-bold text-secondary" htmlFor={labelValue}>
        {labelValue}
      </label>
      <input
        id={labelValue}
        className="textInput my-0.5 w-full rounded border px-3 py-2 caret-secondary outline-none focus:border-primary sm:py-2"
        type={type}
        placeholder={placeHolder}
        value={inputChange}
        onChange={handleChangeInput}
      />
    </div>
  );
}
SignInput.propTypes = {
  labelValue: string,
  placeHolder: string,
  inputValue: func,
  placeHolderColor: string,
  type: string,
};

export default SignInput;
