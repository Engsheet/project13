import { pb } from "@/api/pocketbase";
import { useInfiniteQuery } from "@tanstack/react-query";

const defaultOptions = {
  expand: "writer,place,reservation",
};

/**
 * 인피니티 쿼리 훅
 * @param {*} collection (Stirng) 콜렉션 이름
 * @param {*} options (Object) PocketBase Params 입력
 * @returns Infitite Query 객체
 */
export const useInfiniteList = (collection, options) => {
  const fetchData = async ({ pageParam = 1 }) => {
    try {
      const data = await pb.collection(collection).getList(pageParam, 5, { ...defaultOptions, ...options });
      return data;
    } catch (error) {
      console.error("tryCatch-" + error);
    }
  };

  const { data, isLoading, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [collection, options],
    queryFn: fetchData,
    keepPreviousData: true,
    getNextPageParam: (lastPage) => {
      if (lastPage.page >= lastPage.totalPages) return undefined;
      return lastPage.page + 1;
    },
  });

  if (error) console.error("useQuery-" + error);

  return {
    data: data?.pages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  };
};
