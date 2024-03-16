import _ from "lodash";
import { useCategoryStore } from "@s/category";
import { useRegionStore } from "@/store/region";

// 카테고리 필터링
export const useFilterCategory = (fetchData) => {
  let data = [];
  let filteredData = [];
  const category = useCategoryStore((state) => state.category);
  fetchData && (filteredData = _.cloneDeep(fetchData));
  filteredData.forEach((el) => {
    const filteredItems = el.items.filter((el) => category.includes(el.expand.place.category));
    el.items = [...filteredItems];
  });

  if (category.includes("전체")) data = fetchData;
  else data = filteredData;

  return data;
};

export const useFilterCategoryReservation = (fetchData) => {
  let data = [];
  let filteredData = [];
  const category = useCategoryStore((state) => state.category);

  fetchData && (filteredData = _.cloneDeep(fetchData));
  filteredData.forEach((el) => {
    const filteredItems = el.items.filter((el) => category.includes(el.expand.place.category));
    el.items = [...filteredItems];
  });

  if (category.includes("전체")) data = fetchData;
  else data = filteredData;

  return data;
};

// 관심지역 필터링
export const useFilterRegion = (fetchData) => {
  let data = [];
  let filteredData = [];
  const region = useRegionStore((state) => state.region);
  fetchData && (filteredData = _.cloneDeep(fetchData));
  filteredData.forEach((el) => {
    const filteredItems = el.items.filter((el) => el.expand.place.address.includes(region));
    el.items = [...filteredItems];
  });

  if (region === "전체") data = fetchData;
  else data = filteredData;

  return data;
};
