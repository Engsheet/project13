import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useUserAuth = () => {
  const refetchAuth = async () => {
    try {
      const auth = await pb.collection("users").authRefresh();
      return auth;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: refetchAuth,
  });

  if (error) console.error(error);

  return {
    data,
    refetch,
  };
};
