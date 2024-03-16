import { string } from "prop-types";

function KeywordList({ item }) {
  return <li className="w-15 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-500">{item}</li>;
}

KeywordList.propTypes = {
  item: string,
};

export default KeywordList;
