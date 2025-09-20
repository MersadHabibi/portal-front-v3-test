import { TMeta, TPostItem } from "@/types";
import SubSectionTitle from "./SubSectionTitle";
import NewsCard from "@/app/_components/NewsCard";
import { cn } from "@/lib/style";
import Pagination from "@/modules/Pagination";

export default function News({ data, meta }: { data: TPostItem[] | null; meta:TMeta }) {
  return (
    <div className="relative w-full bg-white mt-[167px] lg:mt-[180px] flex flex-col justify-start gap-16 items-center ">
      <SubSectionTitle title="اخبار بنیاد" />

      <div className="w-full grid grid-cols-1 gap-x-[28px] gap-y-8 sm:grid-cols-2 lg:grid-cols-4 px-3 sm:px-10 lg:px-16">
        {data?.slice(0, 5).map((news, index) => (
          <NewsCard
            key={index}
            data={news}
            showDescription={index === 0}
            className={cn(
              "w-full",
              index === 0 && "sm:col-span-2 sm:row-span-2"
            )}
          />
        ))}
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[14px] md:gap-x-[21px] lg:gap-x-[28px] gap-y-8 px-3 sm:px-10 lg:px-16">
        {data?.slice(5, data.length).map((news, index) => (
          <NewsCard key={index} data={news} className={cn("w-full")} />
        ))}
      </div>

      <Pagination pageInfo={{currentPage:meta.page, totalPages:meta.totalPages}} />
    </div>
  );
}
