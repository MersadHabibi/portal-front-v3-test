'use client'

import { useState, useEffect } from 'react'
import { TPortfolio } from '@/types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

export default function PhotoDetailsView({ data }: { data: TPortfolio }) {
  const { title, description, creator, media } = data
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const body = document.body
    if (selectedIndex !== null) {
      body.classList.add('overflow-hidden')
    } else {
      body.classList.remove('overflow-hidden')
    }
    return () => {
      body.classList.remove('overflow-hidden')
    }
  }, [selectedIndex])

  const handleImageClick = (index: number) => {
    if (selectedIndex === index) {
      setSelectedIndex(null)
      setTimeout(() => {
        setSelectedIndex(index)
      }, 10)
    } else {
      setSelectedIndex(index)
    }
  }

  const closeModal = () => {
    setSelectedIndex(null)
    setThumbsSwiper(null)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex flex-wrap justify-between items-center gap-4 text-sm text-gray-600">
          <ol className="flex gap-2">
            <li>
              <span className="text-gray-500">عکس</span>
            </li>
            <li>
              <span className="text-gray-500">برگزیده</span>
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h4 className="text-sm text-gray-500 font-medium break-words">
            {creator.firstName} {creator.lastName}
          </h4>
          <h1 className="text-xl sm:text-2xl font-bold text-black mt-1 line-clamp-1">
            {title}
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      {media?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {media.map((item, index) => (
            <div
              key={item.id}
              className="relative w-full h-64 cursor-pointer group overflow-hidden"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={item.url}
                alt={item.fileName}
                fill
                className="object-cover rounded shadow-sm transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110"
              />
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="mb-10">
        <p className="text-base text-gray-700 line-clamp-2">{description}</p>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="relative w-full max-w-5xl px-4">
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 text-white text-2xl z-50 hover:text-red-400 transition duration-200 cursor-pointer"
              aria-label="بستن"
            >
              ✕
            </button>

            {/* Main Swiper */}
            <Swiper
              key={selectedIndex}
              loop
              navigation
              initialSlide={selectedIndex}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
              className="mb-4 rounded overflow-hidden"
            >
              {media.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={item.url}
                      alt={item.fileName}
                      fill
                      className="object-contain rounded"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              loop
              slidesPerView={5}
              spaceBetween={10}
              watchSlidesProgress
              modules={[Thumbs]}
              className="rounded"
            >
              {media.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="relative w-full h-24">
                    <Image
                      src={item.url}
                      alt={item.fileName}
                      fill
                      className="object-cover  cursor-pointer border border-gray-300 rounded"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  )
}
