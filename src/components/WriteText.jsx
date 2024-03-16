import { string, func } from "prop-types";
import { useId, useState } from "react";

function WriteText({ label, placeholder, name, onChange }) {
  const INPUT_MAX_LENGTH = 200;

  const inputId = useId();
  const [letterCount, setLetterCount] = useState(0);

  return (
    <div className="flex w-full flex-col gap-2 self-center">
      <label htmlFor="inputId" className="text-center text-lg font-semibold">
        {label}
      </label>
      <textarea
        id="inputId"
        rows="5"
        maxLength={INPUT_MAX_LENGTH}
        placeholder={placeholder}
        className="rounded bg-slate-100 p-3 focus:outline-2"
        onChange={(e) => {
          setLetterCount(e.target.value.length);
          onChange?.({ target: { name: name, value: e.target.value } });
        }}
      ></textarea>
      <span className="text-right text-xs">
        {letterCount}/{INPUT_MAX_LENGTH}
      </span>
    </div>
  );
}

WriteText.propTypes = {
  label: string,
  placeholder: string,
  name: string,
  onChange: func,
};

export default WriteText;
