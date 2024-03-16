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
      keyboard={{enabled: true}}
      modules={[Navigation,Keyboard]}
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
            className={`rounded-md bg-gray-50 p-2 text-gray-500 shadow  ${
              selectedRegion === "전체" ? "bg-secondary text-white" : ""
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
                className={`rounded-md bg-gray-50 p-2 text-gray-500 shadow  ${
                  selectedRegion === item ? "bg-secondary text-white" : ""
                }`}
                id={item}
                onClick={handleActive}
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
          <Link to={"/region"} className="block rounded-md bg-gray-50 p-2 text-gray-500 shadow">
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
