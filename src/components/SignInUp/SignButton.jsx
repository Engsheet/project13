import { func, string } from "prop-types";

function SignButton({ value, handleEvent, bgColor = "bg-primary", textColor = "text-white" }) {
  return (
    <button
      className={`${textColor} ${bgColor} w-full rounded font-bold text-xl border-2 py-4`}
      type="button"
      onClick={handleEvent}
    >
      {value}
    </button>
  );
}
SignButton.propTypes = {
  value: string,
  handleEvent: func,
  bgColor: string,
  textColor: string,
};

export default SignButton;
