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

  if (!slides.length) return null

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
        loop
        spaceBetween={16}
        slidesPerView={1}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="rounded-xl overflow-hidden"
      >
        {slides.map((item) => {
          const imageUrl = item.media?.[0]?.url || ''
          return (
            <SwiperSlide key={item.id}>
              <Link href={`/photo/${item.id}`} className="block">
                <div className="relative w-full aspect-[16/14] md:aspect-[16/9]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                      تصویر موجود نیست
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 transition-all duration-300 hover:text-primary bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <h3 className="text-sm sm:text-xl font-bold line-clamp-1 overflow-hidden">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
        <div className="gallery-pagination"></div>
        <div className="absolute right-2 bottom-12 sm:right-4 sm:bottom-15 z-10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md shadow-2xl text-white text-xs sm:text-sm font-bold">
          <svg
            viewBox="0 0 48 48"
            className="absolute w-full h-full rotate-[-90deg]"
          >
            <circle
              ref={progressCircle}
              cx="24"
              cy="24"
              r="20"
              stroke="#ffffff"
              fill="none"
              strokeWidth="4"
              strokeDasharray="125.6"
              strokeDashoffset="125.6"
              className="transition-all duration-300"
              style={{ transition: 'stroke-dashoffset 0.3s linear' }}
            />
          </svg>
          <span ref={progressContent}></span>
        </div>
        <button className="hero-prev cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl border border-black/30 text-primary rounded-full p-1 sm:p-2 shadow-md hover:bg-primary hover:text-white transition z-10">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        <button className="hero-next cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-xl border border-black/30 text-primary rounded-full p-1 sm:p-2 shadow-md hover:bg-primary hover:text-white transition z-10">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </Swiper>
    </div>
  )
}
