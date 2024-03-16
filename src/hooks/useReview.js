import useReviewStore from "@s/review";
import { useCallback, useMemo } from "react";

function useReview() {
  const reviewData = useReviewStore((state) => state.reviewData);
  const setReviewData = useReviewStore((state) => state.setReviewData);
  const resetReviewData = useReviewStore((state) => state.resetReviewData);

  const handleInputChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setReviewData({ [name]: value });
    },
    [setReviewData]
  );

  return useMemo(
    () => ({ reviewData, setReviewData, handleInputChange, resetReviewData }),
    [handleInputChange, reviewData, setReviewData, resetReviewData]
  );
}

export default useReview;
