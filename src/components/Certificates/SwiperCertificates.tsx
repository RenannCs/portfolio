'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

interface SwiperProps {
  certificates: {
    label: string;
    image: string;
  }[];
}

export default function SwiperCertificates({ certificates }: SwiperProps) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      spaceBetween={30}
      slidesPerView={4}
      loop={true}
      speed={6000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      freeMode={true}
      className="certificates__items"
    >
      {certificates.map(({ label, image }, index) => (
        <SwiperSlide key={index} style={{ width: 'auto' }}>
          <div className="certificates__item" title={label}>
            <img src={image} alt={label} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
