import { useEffect, useState } from "react";
import KEYWORDS from "@d/keywords";
import useReview from "@h/useReview";
import { alertMessage } from "@u/index";
import { produce } from "immer";

function ReviewKeyword() {
  const { handleInputChange } = useReview();

  const [selectedKeyword, setSelectedKeyword] = useState([]);

  useEffect(() => {
    handleInputChange({ target: { name: "keywords", value: selectedKeyword } });
    
  }, [handleInputChange, selectedKeyword]);

  const handleKeywordClick = (keywordName) => {
    if (selectedKeyword.includes(keywordName)) {
      setSelectedKeyword(
        produce(selectedKeyword, (draft) => {
          draft.splice(draft.indexOf(keywordName), 1);
        })
      );
    } else if (selectedKeyword.length < 5) {
      // 최대 5개 선택 제한
      setSelectedKeyword(
        produce(selectedKeyword, (draft) => {
          draft.push(keywordName);
        })
      );
    } else {
      alertMessage("최대 5개까지만 선택할 수 있습니다.", "❗");
    }
  };

  const listItems = KEYWORDS.map((keyword) => (
    <li key={keyword.id} className="mb-2">
      <button
        type="button"
        className={`min-w-max rounded px-3 py-2 shadow-sm shadow-slate-300 
        ${selectedKeyword.includes(keyword.name) ? "bg-primary text-white" : "bg-gray-100 text-black"}`}
        onClick={() => handleKeywordClick(keyword.name)}
      >
        {keyword.name}
      </button>
    </li>
  ));

  return (
    <div className="flex w-full flex-col flex-wrap gap-2 self-center">
      <p className="mt-5 text-center text-lg font-semibold">
        어떤 점이 좋았나요?<span className="text-sm">(1개~5개)</span>
      </p>
      <ul className="flex flex-wrap justify-center gap-x-1 text-xs text-white">{listItems}</ul>
    </div>
  );
}

export default ReviewKeyword;
