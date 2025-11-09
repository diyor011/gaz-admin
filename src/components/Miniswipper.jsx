import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function   NewsImageSlider({ news }) {
  return (
    <div className="w-20 h-20 rounded-lg overflow-hidden shadow">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {news.images?.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${img}`}
              alt={news.title?.uz || "News image"}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
