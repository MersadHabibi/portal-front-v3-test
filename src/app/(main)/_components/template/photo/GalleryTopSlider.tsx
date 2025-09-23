// components/GalleryTopSlider.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { TPortfolio } from '@/types'
import { useRef } from 'react'

export default function GalleryTopSlider({ slides }: { slides: TPortfolio[] }) {
  const progressCircle = useRef<SVGCircleElement>(null)
  const progressContent = useRef<HTMLSpanElement>(null)

  const onAutoplayTimeLeft = (_swiper: any, time: number) => {
    if (slides.length <= 1) return
    const total = _swiper.params.autoplay?.delay || 4000
    const percent = 1 - time / total
    const offset = 125.6 * percent

    if (progressCircle.current) {
      progressCircle.current.style.strokeDashoffset = `${offset}`
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }

  if (!slides.length) {
    return (
      <div className="w-full max-w-screen-xl mx-auto px-4 aspect-[12/4] sm:px-6 lg:px-8 relative my-10 flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="text-center  text-sm sm:text-base  animate-bounce text-primary ">
          هیچ اسلایدی برای نمایش وجود ندارد.
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 aspect-[16/9] sm:px-6 lg:px-8 relative my-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          el: '.gallery-pagination',
          clickable: true,
          bulletClass: 'custom-bullet-Gallery',
          bulletActiveClass: 'custom-bullet-Gallery-active',
        }}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        loop={slides.length > 1}
        spaceBetween={16}
        slidesPerView={1}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((item) => (
          <SwiperSlide key={item.id}>
            <Link
              href={
                item.media[0].type === 'image'
                  ? `/photo/${item.id}`
                  : `/gallery/${item.id}`
              }
              className="block"
            >
              <div className="relative w-full aspect-[16/14] md:aspect-[16/9]">
                {item.media[0].type === 'image' ? (
                  <Image
                    src={item.media[0].url}
                    alt={item.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <video
                    src={item.media[0].url}
                    controls
                    className="w-full h-full object-cover object-center"
                  />
                )}

                <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 hover:text-primary bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                  <h3 className="text-sm sm:text-xl font-bold line-clamp-1 overflow-hidden">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
