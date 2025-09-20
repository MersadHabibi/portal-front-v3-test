"use client";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import SubSectionTitle from "@/app/(index)/_components/SubSectionTitle";
import { cn } from "@/lib/style";
import usePortfolio from "@/hooks/queries/usePortfolio";
import { useSearchParams } from "next/navigation";
import Pagination from "@/modules/Pagination";
import { IPlay } from "@/icons";
import { Swiper, SwiperSlide } from "swiper/react";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImageProps {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const GalleryImage: React.FC<GalleryImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  style,
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={`object-cover size-fit rounded-[10px] ${className || ""}`}
    style={style}
  />
);

const PageContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null);

  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isPending } = usePortfolio({ page, limit: 5 });

  const swiperRef = useRef<SwiperType | null>(null);

  const galleryContent:
    | {
        src: string | undefined;
        alt: string;
        caption: string | undefined;
        isVideo: boolean;
      }[][]
    | undefined = data?.data.map((galleryItem, itemIndex) => {
    return galleryItem.media.map((mediaItem) => {
      console.log(mediaItem);
      return {
        src: mediaItem.url,
        alt: data?.data[itemIndex].title || "",
        caption: data?.data[itemIndex].description || "",
        isVideo: mediaItem.type === "video",
      };
    });
  });

  const openModal = (index: number) => {
    setSelectedGalleryIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedGalleryIndex(null);
  };
  const goToPrevious = () => {
    if (selectedGalleryIndex !== null && swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const goToNext = () => {
    if (selectedGalleryIndex !== null && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto"; // or ''
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto"; // or ''
    };
  }, [isModalOpen]);

  const selectedGallery =
    selectedGalleryIndex !== null
      ? galleryContent?.[selectedGalleryIndex]
      : null;

  return (
    <div
      className="min-h-screen w-full pt-[3.3125rem] pb-[9rem] px-6 lg:px-24 flex flex-col gap-y-28"
      dir="rtl"
    >
      <SubSectionTitle title="نوا و نما" />
      {(!galleryContent || !galleryContent.length) && !isPending && (
        <p className="mx-auto text-base text-black font-normal mt-5">
          محتوایی یافت نشد
        </p>
      )}

      {isPending && (
        <div className="w-full grid grid-cols-10 gap-4">
          <div className="col-span-10 lg:col-span-6 row-span-2 aspect-video lg:aspect-auto w-full bg-gray-200 animate-pulse rounded-custom100" />
          <div className="w-full col-span-5 lg:col-span-2 aspect-square bg-gray-200 animate-pulse rounded-custom100" />
          <div className="w-full col-span-5 lg:col-span-2 aspect-square bg-gray-200 animate-pulse rounded-custom100" />
          <div className="w-full col-span-5 lg:col-span-2 aspect-square bg-gray-200 animate-pulse rounded-custom100" />
          <div className="w-full col-span-5 lg:col-span-2 aspect-square bg-gray-200 animate-pulse rounded-custom100" />
        </div>
      )}
      <div className="w-full flex flex-col lg:flex-row gap-y-5 lg:gap-x-5">
        {/* Main Image */}
        {galleryContent?.[0] && (
          <div
            onClick={() => openModal(0)}
            className="relative group cursor-pointer w-full lg:w-[57%] aspect-11/7 rounded-[10px] overflow-hidden flex justify-center items-center"
          >
            {galleryContent[0][0]?.isVideo && (
              <>
                <IPlay className="absolute z-[2] size-10" />
                <div
                  className={cn(
                    "absolute inset-0 z-[1] bg-transparent group-hover:bg-black/10 transition-all duration-300 ease-in-out"
                  )}
                />
              </>
            )}
            {!galleryContent[0][0]?.isVideo ? (
              <GalleryImage
                src={
                  galleryContent[0][0].src || "/images/image-placeholder.jpg"
                }
                alt={galleryContent[0][0].alt}
                width={609}
                height={401}
                className="w-full h-full [25rem] object-cover" // Use rem for font and spacing
              />
            ) : (
              <video className="w-full h-full [25rem] object-cover">
                <source src={galleryContent[0][0].src || ""}></source>
              </video>
            )}
          </div>
        )}

        {/* Smaller Images Grid */}
        <div className="w-full lg:w-[43%] grid grid-cols-2 gap-2.5 lg:gap-3 xl:gap-3.5 shrink-0 rounded-[10px] overflow-hidden">
          {galleryContent?.slice(1, 5).map((image, index) => (
            <div
              key={index + 1}
              onClick={() => openModal(index + 1)}
              className="relative group cursor-pointer flex justify-center items-center"
            >
              {galleryContent[index + 1][0]?.isVideo && (
                <>
                  <IPlay className="absolute z-[2] size-10" />
                  <div
                    className={cn(
                      "absolute inset-0 z-[1] bg-transparent group-hover:bg-black/10 transition-all duration-300 ease-in-out"
                    )}
                  />
                </>
              )}
              {!galleryContent[index + 1][0]?.isVideo ? (
                <GalleryImage
                  src={
                    galleryContent[index + 1][0]?.src ||
                    "/images/image-placeholder.jpg"
                  }
                  alt={galleryContent[index + 1][0]?.alt}
                  width={609}
                  height={401}
                  className="w-full h-full" // Use rem for font and spacing
                />
              ) : (
                <video className="w-full h-full">
                  <source src={galleryContent[index + 1][0]?.src || ""} />
                </video>
              )}
            </div>
          ))}
        </div>
      </div>

      <Pagination
        pageInfo={{
          currentPage: data?.meta?.page || 1,
          totalPages: data?.meta?.totalPages || 1,
        }}
      />

      {/* Modal */}
      {isModalOpen && selectedGallery && (
        <div
          className="fixed top-0 left-0 pt-[70px] w-full h-full bg-[#00000080] backdrop-blur-xs flex justify-center items-center z-50 cursor-pointer"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeModal();
            }
          }}
          tabIndex={0} // Make the div focusable for keydown event
        >
          <X
            className="absolute top-[23px] right-[40px] lg:right-[68px]"
            color="white"
            size={30}
            onClick={() => closeModal()}
          />
          <div className="h-full pt-[50px] pb-[20px] rounded-t-custom100 bottom-0 w-full bg-white flex flex-col justify-start gap-8 items-center overflow-y-auto [scrollbar-width:thin] px-3">
            <div className="relative w-full flex justify-center items-center">
              {selectedGallery?.length > 1 && (
                <button
                  onClick={goToPrevious}
                  className="z-[2] absolute left-4 lg:left-8 cursor-pointer focus:outline-none"
                >
                  <ChevronLeft strokeWidth={1} size={64} />
                </button>
              )}
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1}
                centeredSlides
                loop
                className="w-full sm:w-[80%] lg:w-[52%] aspect-17/10" //max-w-[833px]
              >
                {selectedGallery?.map((media, index) => (
                  <SwiperSlide
                    key={index}
                    className="!flex justify-center items-center"
                  >
                    {!media.isVideo ? (
                      <Image
                        src={media.src || "/images/image-placeholder.jpg"}
                        alt={media.alt}
                        width={1024}
                        height={748}
                        className="h-fit w-full max-h-full object-cover rounded-[5px]" // Adjust width as needed
                      />
                    ) : (
                      <video
                        controls
                        autoPlay
                        muted
                        className="h-fit w-full max-w-[833px] max-h-full object-cover rounded-[5px]"
                      >
                        <source src={media.src || ""} />
                      </video>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
              {selectedGallery?.length > 1 && (
                <button
                  onClick={goToNext}
                  className="z-[2] absolute right-4 lg:right-8 cursor-pointer focus:outline-none"
                >
                  <ChevronRight strokeWidth={1} size={64} />
                </button>
              )}
            </div>
            {/* caption */}
            <div
              className={cn(
                "w-full sm:w-[80%] lg:w-[52%] text-black rounded-b-[5px] flex flex-col justify-start gap-3 items-start",
                selectedGallery[0]?.isVideo && "bottom-0 bg-white text-black"
              )}
            >
              <h1 className="font-bold text-base">{selectedGallery[0]?.alt}</h1>
              {selectedGallery[0]?.caption && (
                <p className="font-medium text-[14px] leading-6">
                  {selectedGallery[0]?.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContent;
