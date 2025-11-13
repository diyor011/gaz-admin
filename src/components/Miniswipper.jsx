import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

export default function NewsImageSlider({ news }) {

  return (
    <div className="w-20 h-20 rounded-lg overflow-hidden shadow">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {news.mediaType?.map((img, index) => (
          <SwiperSlide key={index}>
            {img.type === "video" ? (
              <video
                src={img.url}
                 autoPlay muted 
                className="w-full h-full rounded-lg object-cover"
              />
            ) : (
              <img
                src={img.url}
                alt={``}
                className="w-full h-full rounded-lg object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
