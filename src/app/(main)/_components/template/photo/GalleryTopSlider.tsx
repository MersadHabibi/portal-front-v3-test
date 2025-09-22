'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { FGetGalleryItems } from '@/api/api'
import { TPortfolio } from '@/types'

export default function GalleryTopSlider() {
  const [slides, setSlides] = useState<TPortfolio[]>([])
  const [loading, setLoading] = useState(true)

  const progressCircle = useRef<SVGCircleElement>(null)
  const progressContent = useRef<HTMLSpanElement>(null)

  const onAutoplayTimeLeft = (_swiper: any, time: number, progress: number) => {
    if (progressCircle.current) {
      const offset = 125.6 * (1 - progress)
      progressCircle.current.style.strokeDashoffset = `${offset}`
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`
    }
  }

  useEffect(() => {
    FGetGalleryItems({ isSlider: true })
      .then((res) => {
        setSlides(res?.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error('Slider fetch error:', err)
        setLoading(false)
      })
  }, [])

  if (loading)
    return <div className="text-center py-10">در حال بارگذاری...</div>
  if (!slides.length) return null

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 aspect-square sm:px-6 lg:px-8 relative mt-10">
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
              <Link href={`/gallery/photo/${item.id}`} className="block">
                <div className="relative w-full  aspect-[16/14] md:aspect-[16/9] ">
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
                  <div className="absolute bottom-0 left-0 right-0  transition-all duration-300 hover:text-primary bg-gradient-to-t from-black/70 to-transparent text-white p-4">
                    <h3 className="text-sm sm:text-xl font-bold">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          )
        })}
        {/* pagnation */}
        <div className="gallery-pagination"></div>
        {/* prog */}
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
