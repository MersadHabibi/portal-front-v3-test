"use client";

import { TPage } from "@/types";
import SubSectionTitle from "@/app/(index)/_components/SubSectionTitle";
import { ILocation, IPhone } from "@/icons";
import { cn } from "@/lib/style";
import Link from "next/link";
import usePage from "@/hooks/queries/usePage";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ContactUsContent() {
  const contact_us_page: TPage | null | undefined = usePage({
    url: "contact-us",
  })?.data;

  const searchParams = useSearchParams();

  const departments = contact_us_page?.keyValues
    ?.filter((keyValue) => keyValue.key.endsWith("-address"))
    ?.sort((a, b) => a.key.localeCompare(b.key));

  const department = searchParams.get("department") ?? "1";

  const address =
    contact_us_page?.keyValues?.find(
      (item) => item.key === `${department}-address`
    )?.value || "";
  const phoneNumber =
    contact_us_page?.keyValues?.find(
      (item) => item.key === `${department}-phone`
    )?.value || "";
  // const time =
  //   contact_us_page?.keyValues.find((item) => item.key === `time`)?.value || "";
  // const email =
  //   contact_us_page?.keyValues.find((item) => item.key === `email`)?.value ||
  //   "";
  const locationMap =
    contact_us_page?.keyValues?.find(
      (item) => item.key === `${department}-location`
    )?.value || "";

  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log(containerRef.current, parentRef.current);
    if (containerRef.current && parentRef.current) {
      const childWidth = containerRef.current.scrollWidth;
      const parentWidth = parentRef.current.getBoundingClientRect().width;
      console.log("parentWidth: ", parentWidth);
      console.log("childWidth: ", childWidth);
      if (childWidth > parentWidth) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }
  }, [parentRef, containerRef, departments?.length]);

  return (
    // <div
    //   className="w-full text-center pt-[54px] border-t border-[#CCCCCC]"
    //   dir="rtl"
    // >
    //   <InnerHTML
    //     style="text-[32px] text-center font-semibold"
    //     details={contact_us_page?.title || ""}
    //   />

    //   <div className="flex lg:flex-row flex-col items-center justify-center gap-5 mt-[104px]">
    //     <div className="flex justify-center items-center flex-col gap-[34px]">
    //       <Image src={location} alt="" />
    //       <InnerHTML style="max-w-[200px]" details={address} />
    //     </div>
    //     <div className="h-[1px] lg:h-[160px] lg:w-[1px] w-[160px] bg-[#CCCCCC] my-[30px] lg:mx-[30px] "></div>
    //     <div className="flex justify-center items-center flex-col gap-[34px] ">
    //       <Image src={phone} alt="" width={32} height={32} />
    //       <InnerHTML style="max-w-[200px] text-justify" details={phoneNumber} />
    //     </div>
    //     <div className="h-[1px] lg:h-[160px] lg:w-[1px] w-[160px] bg-[#CCCCCC] my-[30px] lg:mx-[30px] "></div>
    //     <div className="flex justify-center items-center flex-col gap-[34px]">
    //       <Image src={clock} alt="" />
    //       <InnerHTML style="max-w-[200px] text-justify" details={time} />
    //     </div>
    //     <div className="h-[1px] lg:h-[160px] lg:w-[1px] w-[160px] bg-[#CCCCCC] my-[30px] lg:mx-[30px] "></div>

    //     <div className="flex justify-center items-center flex-col gap-[34px]">
    //       <Image src={envelope} alt="" />
    //       <InnerHTML style="max-w-[200px] text-justify" details={email} />
    //     </div>
    //   </div>
    //   <div>
    //     {/* Location */}
    //     <div className="mt-[78px] mb-[127px] lg:px-[115px] sm:px-[55px] px-[20px]">
    //       <p className="text-[20px] text-right font-medium">موقعیت ما</p>
    //       <div className="flex justify-center mt-[25px] rounded-[15px] bg-[#EEEEE] overflow-hidden">
    //         <InnerHTML style="w-full" details={locationMap} />
    //         {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50266.23731747249!2d46.2858796728375!3d38.05547776083003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401a19f0d4b10319%3A0x32282d4434a3aa8d!2sElgoli%20Pars%20Hotel!5e0!3m2!1sen!2s!4v1745392048145!5m2!1sen!2s"
    //                          width="100%" height="450"  loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full flex flex-col justify-start gap-20 items-center pt-14 pb-32 bg-white">
      <SubSectionTitle title="تماس با ما" />

      <div className="w-full max-w-[1084px] flex flex-col justify-start items-start z-0 px-3">
        {/* tabs container */}
        {(departments?.length || 0) > 1 && (
          <div
            ref={parentRef}
            className="relative -bottom-1 z-[1] flex justify-start gap-2 items-center w-full"
          >
            {isScrolling && (
              <button
                type="button"
                onClick={() => scrollBy(130)}
                className="absolute z-[2] right-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            )}
            <div
              ref={containerRef}
              className="flex justify-start items-center z-[1] overflow-x-auto [scrollbar-width:none] mx-10"
            >
              {departments?.map((_, index) => (
                <Link
                  key={index + 1}
                  href={`/contact-us?department=${String(index + 1)}`}
                  className={cn(
                    "shrink-0 cursor-pointer py-4 lg:py-8 px-[26px] lg:px-12 rounded-tr-custom100 rounded-tl-custom100 text-black text-sm font-medium",
                    Number(department) === index + 1 &&
                      "border-2 border-[#CCCCCC] border-b-4 !border-b-white"
                  )}
                >
                  {index + 1 === 1
                    ? "ساختمان مرکزی"
                    : index + 1 === 2
                    ? "ساختمان دوم"
                    : index + 1 === 3
                    ? "ساختمان سوم"
                    : index + 1 === 4
                    ? "ساختمان چهارم"
                    : index + 1 === 5
                    ? "ساختمان پنجم"
                    : ""}
                </Link>
              ))}
            </div>
            {isScrolling && (
              <button
                type="button"
                onClick={() => scrollBy(-130)}
                className="absolute z-[2] left-0 p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>
        )}
        {/* info box */}
        <div
          className={cn(
            "w-full flex flex-col-reverse lg:flex-row justify-start lg:justify-between gap-3 lg:gap-12 items-start lg:items-start px-5 lg:px-12 py-8 lg:py-12 border-2 border-[#CCCCCC] rounded-custom100"
          )}
        >
          {/* box right */}
          <div className="flex-1 relative top-5 flex flex-col justify-start gap-[15px] lg:gap-10 items-start text-sm/[25px] font-normal text-black">
            {/* info item */}
            <div className="w-full flex justify-start gap-[24px] items-center">
              <ILocation className="shrink-0" />
              <div dangerouslySetInnerHTML={{ __html: address }} />
            </div>
            <div className="w-full flex justify-start gap-[24px] items-center">
              <IPhone className="shrink-0" />
              <div dangerouslySetInnerHTML={{ __html: phoneNumber }} />
            </div>
          </div>

          <div className="flex-2 flex justify-center items-center w-full lg:max-w-[605px] aspect-[16/11] lg:aspect-[16/10] rounded-custom100 overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: locationMap }}
              className="w-full lg:max-w-[605px] aspect-[16/11] lg:aspect-[16/10] rounded-custom100 [&>iframe]:size-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

//lg:max-w-[605px] aspect-[16/11] lg:aspect-[16/10]
