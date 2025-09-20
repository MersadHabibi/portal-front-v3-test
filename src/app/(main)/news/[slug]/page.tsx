import { FGetPost } from "@/api/api";
import InnerHTML from "@/modules/InnerHTML";
import { TPost } from "@/types";
import Comments from "../../_components/Comments";
import Image from "next/image";
import Share from "@/modules/Share";
import Print from "@/modules/Print";

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug || "";

  let newsData: TPost | null = null;

  try {
    const res = await FGetPost({ type: "POST", url: slug });

    console.log(res);

    if (!res.ok) {
      newsData = null;
      throw new Error();
    }

    newsData = (await res.json()).data as TPost;
  } catch {
    newsData = null;
  }

  if (!newsData) {
    return (
      <p className="mx-auto text-base text-black font-normal py-40">
        خطا در دریافت محتوای خبر رخ داده است، لطفا مجددا تلاش فرمایید
      </p>
    );
  }

  console.log(newsData);
  return (
    <div
      className="pt-[60px] pb-[167px] flex flex-col items-center justify-start w-full"
      dir="rtl"
    >
      <InnerHTML
        style="font-semibold text-2xl sm:text-3xl lg:text-4xl text-center ![&>div>p]:text-center lg:px-[140px] md:px-[70px] sm:px-[35px] px-[25px]"
        details={newsData?.title || ""}
      />

      <div className="flex flex-wrap justify-center gap-[15px] items-center w-full mt-6 lg:px-[140px] md:px-[70px] sm:px-[35px] px-[25px]">
        <Print />
        <Share />
        {newsData?.category.map((category, index) => (
          <div
            key={index}
            className="px-3.5 py-[11px] bg-[#001B3A0D] rounded-[30px] font-normal text-[14px]"
          >
            # {category.name}
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center aspect-[16/9] w-full max-w-[900px] mt-5 px-[25px] md:px-[15px] lg:px-0 overflow-hidden rounded-custom100">
        <Image
          src={newsData?.files?.[0]?.url || "/images/image-placeholder.jpg"}
          alt="news lead image"
          width={1024}
          height={748}
          className="size-full object-cover rounded-custom100"
        />
      </div>

      <div className="w-full self-start flex flex-col justify-start items-start mt-[27px] lg:px-[140px] md:px-[70px] sm:px-[35px] px-[25px]">
        <InnerHTML style="text-justify" details={newsData?.htmlCode || ""} />

        <p className="text-right mt-[80px] border-b border-[#CCCCCC] pb-[43px] w-full">
          منتشر شده در تاریخ{"  "}
          {newsData ? new Date(newsData.createdAt).toLocaleString("fa-IR") : ""}
        </p>
      </div>

      <Comments postId={newsData?.id || 0} url={newsData?.url || ""} />
    </div>
  );
}
