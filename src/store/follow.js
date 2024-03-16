import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useFollowCountStore = create(
  devtools((set) => ({
    followCount: {
      following: 0,
      follower: 0,
    },
    setFollowCount: (following, follower) =>
      set(
        () => ({
          followCount: {
            following,
            follower,
          },
        }),
        false,
        "follow/setFollowCount"
      ),
  })),
  {
    name: "follow-count-store",
  }
);
