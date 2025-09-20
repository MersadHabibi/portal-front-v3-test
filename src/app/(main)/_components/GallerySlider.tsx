"use client";

import { cn } from "@/lib/style";
import { TPage } from "@/types";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { useRef, useState } from "react";

enum KeyValues {
  GALLERY_IMAGE = "gallery-image", // in many format sepercated by -number
}

export default function GallerySlider({
  data,
  className,
}: {
  data: TPage | null;
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  const gallery_images = data?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.GALLERY_IMAGE)
  );
  return (
    <Swiper
      onSlideChange={(swiper) => {
        console.log(swiper.realIndex);
        setActiveIndex(swiper.realIndex);
      }}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className={cn("!relative !aspect-17/10 md:!aspect-17/6 z-[0]", className)}
      modules={[Navigation, Autoplay]}
      autoplay
      //   navigation
      loop
      slidesPerView={1}
      // parallax
    >
      {gallery_images?.map((image, index) => (
        <SwiperSlide
          key={index}
          className="rounded-[30px] overflow-hidden aspect-17/10 md:aspect-17/6"
        >
          <Image
            src={image.filesValue.url}
            alt="about us gallery images"
            width={1024}
            height={748}
            className="size-full object-cover"
          />
        </SwiperSlide>
      ))}

      <SliderPagination
        onSlideChange={goToSlide}
        className="absolute top-4 right-8 bg-transparent w-full z-[1]"
        activeIndex={activeIndex}
        count={gallery_images?.length || 0}
      />
    </Swiper>
  );
}

function SliderPagination({
  onSlideChange,
  activeIndex,
  count,
  className,
}: {
  onSlideChange: (index: number) => void;
  activeIndex: number;
  count: number;
  className?: string;
}) {
  return (
    <div className={cn("flex justify-start gap-2 items-center", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          onClick={() => onSlideChange(index)}
          className="cursor-pointer flex-1 rounded-full h-[7px] md:h-[10px] bg-[#D9D9D9] max-w-[80px] md:max-w-[120px] overflow-hidden flex justify-start"
        >
          <div
            className={cn(
              "bg-white w-0 h-full",
              activeIndex === index &&
                "w-full transition-all duration-[3s] ease-linear"
            )}
          />
        </div>
      ))}
    </div>
  );
}
