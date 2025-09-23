// src/app/(main)/_components/template/video/VideoDetailsView.tsx
'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import { TPortfolio } from '@/types'

export default function VideoDetailsView({ data }: { data: TPortfolio }) {
  const { title, description, creator, media } = data
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  if (!media || media.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <h1 className="text-xl font-bold text-black mb-4">{title}</h1>
        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-xl text-gray-500">
          ویدیویی برای نمایش وجود ندارد.
        </div>
        <p className="text-gray-700 mt-4">
          {description || 'توضیحاتی برای این ویدیو ثبت نشده است.'}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
          <ol className="flex gap-2">
            <li>
              <span className="text-gray-500">ویدئو</span>
            </li>
            <li>
              <span className="text-gray-500">برگزیده</span>
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h4 className="text-sm text-gray-500 font-medium break-words">
            {creator?.firstName} {creator?.lastName}
          </h4>
          <h1 className="text-xl sm:text-2xl font-bold text-black mt-1 line-clamp-1">
            {title}
          </h1>
        </div>
      </div>

      {/* Main Swiper */}
      <Swiper
        loop={media.length > 1}
        navigation={media.length > 1}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="mb-4 rounded overflow-hidden"
      >
        {media.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative w-full aspect-video bg-black">
              {item.url ? (
                <video
                  src={item.url}
                  controls
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  ویدئو موجود نیست
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {media.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop
          slidesPerView={Math.min(media.length, 5)}
          spaceBetween={10}
          watchSlidesProgress
          modules={[Thumbs]}
          className="rounded"
        >
          {media.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-45 rounded overflow-hidden border border-gray-300">
                {item.url ? (
                  <video
                    src={item.url}
                    className="w-full h-full object-cover cursor-pointer"
                    muted
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                    -
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Summary */}
      {description && (
        <div className="my-6 text-gray-700">
          <p>{description}</p>
        </div>
      )}
    </div>
  )
}
