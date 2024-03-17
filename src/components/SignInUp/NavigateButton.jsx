import { func, string } from "prop-types";

function NavigateButton({ value, handleEvent }) {
  return (
    <button
      type="button"
      className="text-sm hover:text-primary hover:underline hover:decoration-primary focus:text-primary focus:underline focus:decoration-primary sm:text-base"
      onClick={handleEvent}
    >
      {value}
    </button>
  );
}

NavigateButton.propTypes = {
  value: string,
  handleEvent: func,
};

export default NavigateButton;
