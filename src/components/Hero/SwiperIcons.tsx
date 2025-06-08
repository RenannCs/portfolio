'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface SwiperIconsProps {
  icons: {
    label: string;
    image: string; 
  }[];
}

export default function SwiperIcons({ icons }: SwiperIconsProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={5}
      slidesPerView={10}
      loop={true}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      className="hero__icons"
    >
      {icons.map(({ label, image }, index) => (
        <SwiperSlide key={index}>
          <div className="hero__icon" title={label}>
            <img src={image} alt={label} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
