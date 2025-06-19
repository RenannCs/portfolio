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
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      speed={6000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      freeMode={true}
      className="certificates__items"
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
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
