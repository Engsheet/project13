import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import useReservationStore from "@/store/reservation";
import { getPbImageURL } from "@u";
import { Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css";

function PlaceInfo() {
  const { userInfo, item } = useLocation().state || {};
  const { setReservationData } = useReservationStore();

  useEffect(() => {
    setReservationData({
      booker: userInfo.id,
      email: userInfo.email,
      place: item.expand.place.id,
    });
  }, [userInfo, item.expand.place.id, setReservationData]);

  return (
    <div className="w-full pb-2">
      <h1 className="text-lg font-semibold">{item.expand.place.title}</h1>
      <p className="mb-10 border-b pb-2">
        {item.expand.place.category}
        <span className="mx-1">|</span>
        {item.expand.place.address}
      </p>

      <figure>
        <Swiper
          className="photo-swiper"
          spaceBetween={30}
          loop={true}
          navigation={true}
          pagination={{
            type: "fraction",
          }}
          keyboard={{ enabled: true }}
          modules={[Navigation, Pagination, Keyboard]}
        >
          {item.expand.place.photos.map((fileName) => (
            <SwiperSlide key={crypto.randomUUID()} className="bg-cover bg-center">
              <img
                src={getPbImageURL(item.expand.place, fileName)}
                alt="리뷰 사진"
                className="h-full w-full rounded-lg object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </figure>
    </div>
  );
}

export default PlaceInfo;
