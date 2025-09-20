"use client";

import { cn } from "@/lib/style";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SearchNews({
  classNames,
}: {
  classNames?: { container?: string; input?: string };
}) {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <div
        className={cn(
          "flex justify-end items-center rounded-full w-max px-2 border border-[#CCCCCC]",
          classNames?.container
        )}
      >
        <input
          type="text"
          placeholder="در اخبار جستجو کنید..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn(
            "p-2 text-sm text-black/80 font-normal outline-none",
            classNames?.input
          )}
        />

        <Link
          href={searchValue.length ? `/news?search=${searchValue}` : "#"}
          className="size-5"
        >
          <Search />
        </Link>
      </div>
    </>
  );
}
