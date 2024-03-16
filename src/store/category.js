import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCategoryStore = create(
  devtools((set) => ({
    category: ["전체"],
    addCategory: (newItem) =>
      set(
        (state) => ({
          category: [...state.category.filter((el) => el !== "전체"), newItem],
        }),
        false,
        "category/addCategory"
      ),
    removeCategory: (selectedItem) =>
      set(
        (state) => ({
          category: state.category.filter((el) => el !== "전체").filter((el) => el !== selectedItem),
        }),
        false,
        "category/removeCategory"
      ),
    resetCategory: () =>
      set(
        () => ({
          category: ["전체"],
        }),
        false,
        "category/resetCategory"
      ),
  }))
);
