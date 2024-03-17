import { string } from "prop-types";

function SignTitle({ value }) {
  return <h2 className="text-xl sm:text-2xl font-bold">{value}</h2>;
}

SignTitle.propTypes = {
  value: string,
};

export default SignTitle;
