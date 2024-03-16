import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useFetchRecord = (recordId) => {
  const fetchRecord = async () => {
    try {
      const record = await pb.collection("reviews").getOne(recordId, {
        expand: "place,writer,reservation",
      });
      return record;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, refetch } = useQuery({
    queryKey: ["record", recordId],
    queryFn: () => fetchRecord(recordId),
  });

  if (error) console.error(error);

  return {
    data,
    refetch,
  };
};
