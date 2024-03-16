import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

function useFetchAllReviews() {
  const userInfo = pb.authStore.model;

  async function fetchWriteReviewList() {
    try {
      const reviews = await pb.collection("reviews").getFullList({
        filter: `writer = '${userInfo.id}'`,
        fields: "reservation",
      });
      let reservationId = reviews.reduce((array, review) => {
        return [...array, review.reservation];
      }, []);

      return reservationId;
    } catch (error) {
      console.error(error);
    }
  }

  const { data, error } = useQuery({
    queryKey: ["writeReview"],
    queryFn: fetchWriteReviewList,
  });

  if (error) console.error(error);

  return { data };
}

export default useFetchAllReviews;
