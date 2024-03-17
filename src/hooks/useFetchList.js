import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useFetchList = (collection, options) => {
  const fetchData = async () => {
    try {
      const data = await pb.collection(collection).getFullList(options);
      return data;
    } catch (error) {
      console.error("tryCatch-" + error);
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["dataList", collection, options],
    queryFn: () => fetchData(),
  });

  if (error) console.error("useQuery-" + error);

  return {
    data,
    isLoading,
    refetch,
  };
};
