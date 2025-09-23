'use client'

import { TPostItem } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import InnerHTML from '@/modules/InnerHTML'

export default function HeroSlider({ posts }: { posts: TPostItem[] }) {
  if (!posts.length) return null

  return (
    <div className="w-full aspect-[16/9]  h-full  z-[0]">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
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
        className="w-full  aspect-[16/9] lg:min-h-screen  relative"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id} className="relative w-full h-full">
            <Link
              href={`/news/${post.url || '#'}`}
              className="block w-full h-full relative"
              aria-label={post.title}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={post.files[0]?.url || '/images/image-placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover object-center w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-transparent" />
              </div>

              <div className="absolute inset-0 flex items-center px-4 sm:px-12">
                <div className="w-1/2 md:w-1/3 text-right text-white drop-shadow-md">
                  <h2 className="text-lg sm:text-2xl md:text-2xl lg:text-4xl font-bold mb-1.5 lg:mb-3 leading-snug sm:leading-tight lg:leading-tight line-clamp-2 text-primary">
                    {post.title}
                  </h2>
                  <InnerHTML
                    style="text-sm sm:text-base lg:text-lg line-clamp-3 !text-white"
                    details={post?.htmlCode || ''}
                  />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
