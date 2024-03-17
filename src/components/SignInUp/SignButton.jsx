import { func, string } from "prop-types";
import { PiArrowBendDownRightLight } from "react-icons/pi";

function SignButton({ ariaLabel, handleEvent }) {
  return (
    <button
      type="button"
      className="flex aspect-square w-11 items-center justify-center rounded-full bg-primary text-xl hover:bg-secondary focus:bg-secondary sm:w-[52px] sm:text-2xl"
      onClick={handleEvent}
      aria-label={ariaLabel}
    >
      <PiArrowBendDownRightLight />
    </button>
  );
}

SignButton.propTypes = {
  handleEvent: func,
  ariaLabel: string,
};

export default SignButton;
