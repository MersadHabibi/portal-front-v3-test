"use client";

import useSearchQueries from "@/hooks/useSearchQueries";
import { cn } from "@/lib/style";
import { TCategory } from "@/types";

export default function CategorySelector({
  activeId,
  categoriesList,
}: {
  activeId: number;
  categoriesList: TCategory[] | null;
}) {
  const setSearchQuery = useSearchQueries();

  return (
    <div className="w-full px-5 sm:w-[90%] md:w-[85%] lg:w-[80%] flex justify-center gap-0 items-center flex-wrap mt-10 mx-auto">
      <div
        onClick={() => setSearchQuery(["category"], ["0"])}
        className={cn(
          "flex justify-center gap-0 items-center cursor-pointer py-1 px-3 md:px-5 rounded-full text-black text-[15px] md:text-lg font-normal mb-5 z-0 transition-all duration-300",
          !Number(activeId) && "text-white bg-black py-0 px-5 md:px-12"
        )}
      >
        <span className={cn("", !Number(activeId) && "relative -right-2 md:-right-4 text-[28px] md:text-[32px]")}>#</span>همه
      </div>
      {categoriesList?.map((category, index) => (
        <div
          onClick={() => setSearchQuery(["category"], [category.id])}
          key={index}
          className={cn(
            "flex justify-center gap-0 items-center cursor-pointer py-1 px-3 md:px-5 rounded-full text-black text-[15px] md:text-lg font-normal mb-5 z-0  transition-all duration-300",
            activeId === Number(category.id) && "text-white bg-black py-0 px-5 md:px-12"
          )}
        >
          <span className={cn("", activeId === Number(category.id) && "relative -right-2 md:-right-4 text-[28px] md:text-[32px]")}>#</span>
          {category.name}
        </div>
      ))}
    </div>
  );
}
