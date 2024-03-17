import { func, string } from "prop-types";

function NavigateButton({ value, handleEvent }) {
  return (
    <button type="button" className="text-sm sm:text-base underline hover:text-primary focus:text-primaryhover:decoration-primary focus:decoration-primary" onClick={handleEvent}>
      {value}
    </button>
  );
}

NavigateButton.propTypes = {
  value: string,
  handleEvent: func,
};

export default NavigateButton;
