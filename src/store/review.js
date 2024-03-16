import { create } from "zustand";

const initialReviewData = {
  writer: "",
  contents: "",
  photos: null,
  keywords: null,
  place: "",
  reservation: ""
}

const useReviewStore = create((set) => ({
  reviewData: { ...initialReviewData },
  setReviewData: (data) => set((state) => ({ reviewData: { ...state.reviewData, ...data } })),
  resetReviewData() { set({ reviewData : {...initialReviewData} }); }
}));

export default useReviewStore;