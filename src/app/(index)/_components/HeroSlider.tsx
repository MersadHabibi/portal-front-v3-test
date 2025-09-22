'use client'

import { TPostItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function HeroSlider({ posts }: { posts: TPostItem[] }) {
  if (!posts.length) return null

  return (
    <div className="w-full relative z-[1]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        pagination={{
          clickable: true,
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        loop
        className="w-full h-fit"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <div className="relative w-full aspect-[16/9] lg:min-h-screen overflow-hidden">
              <Image
                src={post.files[0]?.url || '/images/image-placeholder.jpg'}
                alt={post.title}
                fill
                className="object-cover h-full w-full"
                priority
              />
              <Link
                href={`/news/${post.url || '#'}`}
                className="absolute inset-0 z-[3] cursor-pointer"
                aria-label={post.title}
              />
              <div className="absolute bottom-0 left-0 w-full h-[30%] pointer-events-none z-[2] bg-gradient-to-t from-white/80 to-transparent" />
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute z-[5] flex flex-col gap-3 right-[4%] bottom-[50%] justify-center items-center w-auto">
          <button className="hero-prev cursor-pointer bg-white/80 backdrop-blur-2xl border-black/80 border-1 text-primary rounded-full p-1 sm:p-2 shadow-md hover:bg-primary hover:text-white transition">
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <button className="hero-next cursor-pointer bg-white/80 backdrop-blur-2xl border-1 border-black/80 text-primary rounded-full p-1 sm:p-2 shadow-md hover:bg-primary hover:text-white transition">
            <svg
              className="w-5 h-5 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M19 12H5m6-6l-6 6 6 6" />
            </svg>
          </button>
        </div>
      </Swiper>
    </div>
  )
}
