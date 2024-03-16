import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useFetchWriteReviews = (collection, options) => {
  const fetchWriteReviews = async () => {
    try {
      const reviews = await pb.collection(collection).getFullList(options);

      let reservationId = reviews.reduce((array, review) => {
        return [...array, review.reservation];
      }, []);

      return reservationId;
    } catch (error) {
      console.error("tryCatch-" + error);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["writeReviews"],
    queryFn: fetchWriteReviews,
  });

  if (error) console.error("useQuery-" + error);

  return {
    data,
    isLoading,
    refetch,
  };
};