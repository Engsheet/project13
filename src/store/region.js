import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useRegionStore = create(
  devtools((set) => ({
    region: "전체",
    selectRegion: (newItem) =>
      set(
        () => ({
          region: newItem,
        }),
        false,
        "region/selectRegion"
      ),
  }))
);
