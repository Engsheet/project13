import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecord = (collection, recordId, options) => {
  const fetchRecord = async () => {
    try {
      const record = await pb.collection(collection).getOne(recordId, options);
      
      return record;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["record", recordId],
    queryFn: () => fetchRecord(recordId),
  });

  if (error) console.error(error);

  return {
    data,
    isLoading,
    refetch,
  };
};
