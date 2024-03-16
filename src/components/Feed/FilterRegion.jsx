import { pb } from "@/api/pocketbase";
import { string } from "prop-types";
import { Link } from "react-router-dom";
import { useRegionStore } from "@s/region";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

function FilterRegion() {
  const myRegion = pb.authStore.model.regions;
  const { region: selectedRegion, selectRegion } = useRegionStore();

  const handleActive = (e) => {
    const selectedItem = e.target.id;
    selectRegion(selectedItem);
  };

  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={"auto"}
      navigation={true}
      keyboard={{ enabled: true }}
      modules={[Navigation, Keyboard]}
      className="pb-1 text-sm sm:text-base"
    >
      <SwiperSlide
        key={crypto.randomUUID()}
        style={{
          width: "auto",
        }}
      >
        <li>
          <button
            className={`rounded-md border border-transparent bg-gray-50 p-2 text-gray-500 shadow  ${
              selectedRegion === "전체"
                ? "bg-secondary font-bold text-white"
                : "hover:border-secondary hover:font-semibold hover:text-black"
            }`}
            id={"전체"}
            onClick={handleActive}
          >
            전체
          </button>
        </li>
      </SwiperSlide>

      {myRegion &&
        myRegion.map((item) => (
          <SwiperSlide
            key={crypto.randomUUID()}
            style={{
              width: "auto",
            }}
          >
            <li key={crypto.randomUUID()}>
              <button
                id={item}
                onClick={handleActive}
                className={`rounded-md border border-transparent outline-none bg-gray-50 p-2 text-gray-500 shadow  ${
                  selectedRegion === item
                    ? "bg-secondary font-bold text-white"
                    : "hover:border-secondary focus:border-secondary focus:font-semibold hover:font-semibold focus:text-black hover:text-black"
                }`}
              >
                {item}
              </button>
            </li>
          </SwiperSlide>
        ))}
      <SwiperSlide
        key={crypto.randomUUID()}
        style={{
          width: "auto",
        }}
      >
        <li>
          <Link
            to={"/region"}
            className="block rounded-md border border-transparent bg-gray-50 p-2 text-gray-500 shadow hover:border-secondary hover:font-semibold hover:text-black"
          >
            + 관심지역
          </Link>
        </li>
      </SwiperSlide>
    </Swiper>
  );
}

FilterRegion.propTypes = {
  title: string,
};

export default FilterRegion;
