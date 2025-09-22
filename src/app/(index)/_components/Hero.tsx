'use client'

import Header from '@/app/_components/Header'
import { cn } from '@/lib/style'
import InnerHTML from '@/modules/InnerHTML'
import { TPage, TPostItem } from '@/types'
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react'
import Image from 'next/image'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import HeroSlider from './HeroSlider'
import { FGetSliderPosts } from '@/api/api'

enum KeyValues {
  HERO_TITLE = 'hero-title',
  HERO_IMAGE = 'hero-image',
  SUBCATEGORIES_LOGO = 'subCategories-logo', //many seperated by -number
  SUBCATEGORIES_DETAIL = 'subCategories-detail', //many seperated by -number
}

export default function Hero({
  pageData,
  sliderPosts,
}: {
  pageData: TPage | null
  sliderPosts: TPostItem[]
}) {
  const firstElementRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const parentRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [activeSubCategoryNumber, setActiveSubCategoryNumber] = useState<
    string | undefined
  >()
  const [isHovering, setIsHovering] = useState(false)

  const title =
    pageData?.keyValues.find((keyValue) =>
      keyValue.key.startsWith(KeyValues.HERO_TITLE)
    )?.value || ''
  const image = pageData?.keyValues.find((keyValue) =>
    keyValue.key.startsWith(KeyValues.HERO_IMAGE)
  )?.filesValue?.url
  const logos = pageData?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.SUBCATEGORIES_LOGO)
  )
  const details = pageData?.keyValues.filter((keyValue) =>
    keyValue.key.startsWith(KeyValues.SUBCATEGORIES_DETAIL)
  )

  const scrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: offset,
        behavior: 'smooth',
      })
    }
  }

  // Auto-cycle through subcategories
  useEffect(() => {
    if (!logos?.length || isHovering) return

    // Set initial active category if not set
    if (!activeSubCategoryNumber) {
      setActiveSubCategoryNumber(logos[0].key.split('-')[2])
      return
    }

    const interval = setInterval(() => {
      setActiveSubCategoryNumber((prevNumber) => {
        if (!prevNumber) return logos[0].key.split('-')[2]

        const currentIndex = logos.findIndex((logo) =>
          logo.key.endsWith(`-${prevNumber}`)
        )
        const nextIndex = (currentIndex + 1) % logos.length
        return logos[nextIndex].key.split('-')[2]
      })
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [logos, activeSubCategoryNumber, isHovering])

  // Scroll to active subcategory when it changes
  useEffect(() => {
    if (!activeSubCategoryNumber || !logos?.length) return

    const activeLogo = logos.find((logo) =>
      logo.key.endsWith(`-${activeSubCategoryNumber}`)
    )
    if (!activeLogo) return

    // Find the DOM element for the active logo
    const activeElement = containerRef.current?.querySelector(
      `[data-logo-key="${activeLogo.key}"]`
    ) as HTMLElement
    if (!activeElement || !containerRef.current || !parentRef.current) return

    // Calculate scroll position similar to click behavior
    const MARGIN_OFFSET =
      (document.body.getBoundingClientRect().width < 648 ? 12 : 32) + 28
    const elementLeftOffset = activeElement.getBoundingClientRect().left || 0
    const parentElementLeftOffset =
      parentRef.current.getBoundingClientRect().left || 0
    const leftOffset =
      elementLeftOffset - parentElementLeftOffset - MARGIN_OFFSET

    const elementRightOffset = activeElement.getBoundingClientRect().right || 0
    const parentElementRightOffset =
      parentRef.current.getBoundingClientRect().right || 0
    const rightOffset =
      elementRightOffset - parentElementRightOffset + MARGIN_OFFSET

    // Scroll if element is partially visible
    if (leftOffset > -145 && leftOffset < 0) {
      scrollBy(leftOffset)
    } else if (rightOffset > 0 && rightOffset < 145) {
      scrollBy(rightOffset)
    }
  }, [activeSubCategoryNumber, logos])

  useEffect(() => {
    console.log(containerRef.current, parentRef.current)
    if (containerRef.current && parentRef.current) {
      const childWidth = containerRef.current.scrollWidth
      console.log('hidden portion: ', childWidth % 145)
      const parentWidth = parentRef.current.getBoundingClientRect().width
      console.log('parentWidth: ', parentWidth)
      console.log('childWidth: ', childWidth)
      if (childWidth > parentWidth) {
        setIsScrolling(true)
      } else {
        setIsScrolling(false)
      }
    }
  }, [parentRef, containerRef])

  const onSubsetSelection = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    logo: any
  ) => {
    const MARGIN_OFFSET =
      (document.body.getBoundingClientRect().width < 648 ? 12 : 32) + 28

    const elementLeftOffset = e.currentTarget.getBoundingClientRect().left || 0
    const parentElementLeftOffset =
      parentRef?.current?.getBoundingClientRect().left || 0

    const leftOffset =
      elementLeftOffset - parentElementLeftOffset - MARGIN_OFFSET

    console.log('elementLeftOffset', leftOffset)
    // console.log("parentElementLeftOffset", parentElementLeftOffset)

    const elementRightOffset =
      e.currentTarget.getBoundingClientRect().right || 0
    const parentElementRightOffset =
      parentRef?.current?.getBoundingClientRect().right || 0

    const rightOffset =
      elementRightOffset - parentElementRightOffset + MARGIN_OFFSET
    console.log('elementRightOffset', rightOffset)
    // console.log("parentElementRightOffset", parentElementRightOffset)

    if (leftOffset > -145 && leftOffset < 0) {
      scrollBy(leftOffset)
    } else if (rightOffset > 0 && rightOffset < 145) {
      scrollBy(rightOffset)
    }
    setActiveSubCategoryNumber(logo.key.split('-')[2])
  }

  return (
    <>
      <Header className="z-[20]" />
      {/* <div className="absolute top-[57px] lg:top-[70px] aspect-16/9 sm:aspect-[16/7]">
        <Image src={image || "/images/avini.jpg"} alt="hero image" width={1900} height={1260} className="object-cover size-full object-[0%_35%] z-[1]" />
        <div className="absolute inset-0 size-full bg-gradient-to-t from-white/100 to-white/20 z-[2]" />
      </div> */}
      <HeroSlider posts={sliderPosts} /> {/* inner container */}
      <div className="  z-[10]  -mt-10 sm:-mt-30    lg:-mt-45     flex flex-col justify-start items-center w-full max-w-[1090px] bg-transparent px-5 sm:px-3">
        {/* <div className="relative top-[50px] sm:top-[80px] w-full max-w-[774px] text-[#A9833D] text-2xl/[45px] sm:text-3xl/[70px] font-bold text-center ">
          <span className="bg-primary px-2 py-1 rounded-full text-white">بنیاد روایت فتح</span>{" "}
          <div className="inline [&>p]:inline" dangerouslySetInnerHTML={{ __html: title }} />
        </div> */}
        {/* <Image
          src="/images/signiture.png"
          alt="signiture of revayat"
          width={500}
          height={300}
          className="object-cover relative self-end -left-5 w-[360px] h-[177px] opacity-25"
        /> */}

        <div
          ref={parentRef}
          className=" flex justify-between items-center w-full z-[0]"
        >
          {isScrolling && (
            <button
              onClick={() => scrollBy(145)}
              className="cursor-pointer relative top-[7px]"
            >
              <ChevronRightCircle
                strokeWidth={1.2}
                className="size-[28px] text-primary"
              />
            </button>
          )}
          {/* logos container */}
          <div
            ref={containerRef}
            className="w-full cursor-pointer overflow-x-auto [scrollbar-width:none] pt-[20px] mx-3 sm:mx-8 flex flex-row"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {!logos?.length && (
              <p className="mx-auto">هنوز هیچ زیر مجموعه ای موجود نیست.</p>
            )}
            {logos?.map((logo, index) => (
              <div
                ref={index === 0 ? firstElementRef : null}
                onClick={(e) => onSubsetSelection(e, logo)}
                key={index}
                data-logo-key={logo.key}
                className={cn(
                  'flex justify-center items-center rounded-tl-custom100 rounded-tr-custom100 overflow-hidden w-[145px] h-[100px] p-2 bg-transparent shrink-0 transition-all duration-500 ease-in-out',
                  logo.key.endsWith(`-${activeSubCategoryNumber}`) && 'bg-white'
                )}
              >
                <Image
                  src={logo.filesValue.url || '/images/image-placeholder.jpg'}
                  alt={'logo'}
                  width={500}
                  height={500}
                  className="size-[80%] object-contain"
                />
              </div>
            ))}
          </div>
          {isScrolling && (
            <button
              onClick={() => scrollBy(-145)}
              className="cursor-pointer relative top-[7px]"
            >
              <ChevronLeftCircle
                strokeWidth={1.2}
                className="size-[28px] text-primary"
              />
            </button>
          )}
        </div>

        {/* detailBox */}
        <div
          className="  w-full bg-white [box-shadow:0_0_25px_rgba(0,0,0,0.1)] rounded-custom100 py-10 px-3 flex justify-center  z-0 "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <InnerHTML
            style="w-full max-w-[675px] [&>div>p>a]:text-blue-500 [&>div>p>a]:underline [&>div>p>a]:underline-offset-5 transition-opacity duration-500 ease-in-out"
            details={
              details?.find((detail) =>
                detail.key.endsWith(`-${activeSubCategoryNumber}`)
              )?.value || ''
            }
          />
        </div>
      </div>
    </>
  )
}
