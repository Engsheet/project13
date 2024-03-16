import { useCategoryStore } from "@/store/category";
import { bool, string } from "prop-types";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const CATEGORY = ["전체", "한식", "양식", "일식", "중식", "카페", "술집", "동남아 음식", "레스토랑", "뷔페"];

function SwiperCategory() {
  const { category: selectedCategory, addCategory, removeCategory, resetCategory } = useCategoryStore();

  useEffect(() => {
    !selectedCategory.length && resetCategory();
  }, [selectedCategory, resetCategory]);

  const handleActive = (e) => {
    const selectedItem = e.target.id;
    if (selectedItem === "전체") {
      resetCategory();
      return;
    }

    selectedCategory.includes(selectedItem) ? removeCategory(selectedItem) : addCategory(selectedItem);
  };

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={"auto"}
      navigation={true}
      keyboard={{ enabled: true }}
      modules={[Navigation, Keyboard]}
    >
      {CATEGORY.map((item, index) => (
        <SwiperSlide
          key={index}
          style={{
            width: "auto",
          }}
        >
          <li key={crypto.randomUUID()}>
            <button
              id={item}
              onClick={handleActive}
              className={`
                rounded-2xl border p-2 outline-none
                ${
                  selectedCategory.includes(item)
                    ? "hover:bg-primaryLight focus:bg-primaryLight border-primary bg-primary font-bold text-white hover:font-normal focus:font-normal focus:text-black"
                    : "text-gray-700 hover:border-primary hover:font-bold focus:border-primary focus:font-bold"
                }
              `}
            >
              {item}
            </button>
          </li>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

SwiperCategory.propTypes = {
  title: string,
  isActive: bool,
};

export default SwiperCategory;
