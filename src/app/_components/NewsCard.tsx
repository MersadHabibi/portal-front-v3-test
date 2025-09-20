import { IArrowLeft } from "@/icons";
import { cn } from "@/lib/style";
import { TPostItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function NewsCard({
  showDescription = false,
  data,
  className,
}: {
  showDescription?: boolean;
  data?: TPostItem;
  className?: string;
}) {
  return (
    <Link
      href={`/news/${data?.url}` || "#"}
      className={cn(
        "flex flex-col justify-start gap-3 items-start group cursor-pointer hover:scale-[0.985] transition-all duration-500 ease-[cubic-bezier(0.5,-0.55,0.27,1.2)]",
        className
      )}
    >
      <div className="w-full rounded-custom100 aspect-16/11 overflow-hidden transition-all duration-400 ease-in-out">
        <Image
          src={data?.files[0]?.url || "/images/image-placeholder.jpg"}
          alt={"post banner image"}
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>

      <p
        className={cn(
          "text-lg sm:text-xl font-medium text-black line-clamp-3",
          showDescription && "sm:text-[32px]"
        )}
      >
        {data?.title || ""}
      </p>

      {showDescription && (
        <div
          dangerouslySetInnerHTML={{ __html: data?.htmlCode || "" }}
          className="max-sm:hidden text-[15px]/[25px] font-normal line-clamp-4"
        />
      )}
      <div className="flex justify-start gap-2 items-center text-sm sm:text-base font-medium text-[#007DC3] group-hover:underline underline-offset-8">
        مطالعه بیشتر
        <IArrowLeft />
      </div>
    </Link>
  );
}
