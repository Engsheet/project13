import { pb } from "@/api/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const useUserInfo = (userId) => {
  const fetchUser = async () => {
    try {
      const user = await pb.collection("users").getOne(userId);
      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const { data, error, refetch } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  if (error) console.error(error);

  return {
    data,
    refetch,
  };
};
