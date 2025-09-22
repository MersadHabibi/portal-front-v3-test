'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css' // core Swiper
import 'swiper/css/navigation' // optional modules
import { Navigation } from 'swiper/modules'

import SubSectionTitle from './SubSectionTitle'
import HistoryItem from './HistoryItem'
import { useState } from 'react'
import { cn } from '@/lib/style'
import Image from 'next/image'
import { TPage } from '@/types'

enum KeyValues {
  HISTORY_LINE_TITLE = 'history-line-title', //many seperated by -number
  HISTORY_LINE_DATE = 'history-line-date', //many seperated by -number
  HISTORY_LINE_DESCRIPTION = 'history-line-description', //many seperated by -number
}

export default function History({ pageData }: { pageData: TPage | null }) {
  const [activeIndex, setActiveIndex] = useState(2)

  const titles = pageData?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.HISTORY_LINE_TITLE)
  )
  const dates = pageData?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.HISTORY_LINE_DATE)
  )
  const descriptions = pageData?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.HISTORY_LINE_DESCRIPTION)
  )
  return (
    <div className="relative w-full bg-white flex flex-col justify-start gap-14 items-center z-0 mb-[200px] mt-[150px] ">
      <SubSectionTitle title="روند بنیاد" />
      <div className="absolute sm:left-20 lg:left-28 -top-5 sm:top-[70px] w-[360px] h-[177px] opacity-10 z-[1]">
        <Image
          src="/images/signiture.png"
          alt="signiture"
          width={500}
          height={300}
          className="object-cover size-full"
        />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        initialSlide={2}
        className="w-full max-w-full bg-transparent !py-[25px] overflow-visible [&>.swiper-wrapper]:overflow-visible [&>.swiper-wrapper]:flex [&>.swiper-wrapper]:items-baseline-last z-[2]"
        centeredSlides={true}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        breakpoints={{
          20: { slidesPerView: 1 },
          640: { slidesPerView: 'auto' },
        }}
      >
        {titles?.map((title, index) => (
          <SwiperSlide
            key={index}
            className={cn(
              'w-full sm:!w-auto shrink-0 !flex flex-col justify-end items-center'
            )}
          >
            <HistoryItem
              isActive={index === activeIndex}
              data={{
                title: title.value,
                date:
                  dates?.find((date) =>
                    date.key.endsWith(title.key.split('-')[3])
                  )?.value || '',
                description:
                  descriptions?.find((description) =>
                    description.key.endsWith(title.key.split('-')[3])
                  )?.value || '',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
